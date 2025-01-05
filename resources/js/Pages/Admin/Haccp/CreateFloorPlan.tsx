import { useCallback, useRef, useState } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import CommonButton from '@/Components/CommonButton';
import TextInput from '@/Components/TextInput';
import * as htmlToImage from 'html-to-image';

interface Label {
  id: number;
  x: number;
  y: number;
  text: string;
}

interface Route {
  id: number;
  x: number;
  y: number;
  text: string;
}

interface ImageAnnotationProps {
  auth: any;
  baseUrl: string;
  floorPlan: string;
  floorPlanEquipment: string[];
  companyId: Number;
  routeField: string[];
}

export default function CreateFloorPlan({
  baseUrl,
  floorPlanEquipment,
  floorPlan,
  companyId,
}: ImageAnnotationProps) {
  const auth: any = usePage().props.auth;
  const [labels, setLabels] = useState<Label[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [inputFields, setInputFields] = useState<string[]>(
    floorPlanEquipment || []
  );
  const [isActive, setIsActive] = useState(true);
  const imageContainerRef = useRef(null);
  const idCompany = (companyId as any).id;

  const handleAddInput = () => {
    setInputFields([...inputFields, '']);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedFields = [...inputFields];
    updatedFields[index] = value;
    setInputFields(updatedFields);
  };

  const handleAddLabel = (index: number) => {
    const text = inputFields[index];
    if (text.trim() === '' || labels.some((label) => label.id === index + 1))
      return;

    const newLabel: Label = {
      id: index + 1,
      x: 100,
      y: 100,
      text,
    };
    setLabels([...labels, newLabel]);
  };

  const handleDrag = (e: DraggableEvent, ui: DraggableData, id: number) => {
    const updatedLabels = labels.map((label) => {
      if (label.id === id) {
        return {
          ...label,
          x: label.x + ui.deltaX,
          y: label.y + ui.deltaY,
        };
      }
      return label;
    });
    setLabels(updatedLabels);
  };

  const handleDragRoute = (
    e: DraggableEvent,
    ui: DraggableData,
    id: number
  ) => {
    const updatedRoutes = routes.map((route) => {
      if (route.id === id) {
        return {
          ...route,
          x: route.x + ui.deltaX,
          y: route.y + ui.deltaY,
        };
      }
      return route;
    });
    setRoutes(updatedRoutes);
  };

  const handleRemoveLabel = (id: number) => {
    const updatedLabels = labels.filter((label) => label.id !== id);
    setLabels(updatedLabels);
  };

  const handleRemoveRoute = (id: number) => {
    const updatedRoutes = routes.filter((route) => route.id !== id);
    setRoutes(updatedRoutes);
  };

  const handleRemoveInput = (index: number) => {
    const updatedFields = inputFields.filter((_, i) => i !== index);
    setInputFields(updatedFields);
    const updatedLabels = labels.filter((label) => label.id !== index + 1);
    setLabels(updatedLabels);
  };

  const [image, setImage] = useState<string | null>(
    `${baseUrl}/charts/floorPlan.jpg`
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const downloadAndSendImage = useCallback(() => {
    if (!imageContainerRef.current) return;
    const filename = image ? image.split('/').pop() : 'FloorPlan.png';
    htmlToImage
      .toPng(imageContainerRef.current)
      .then((dataUrl) => {
        const byteString = atob(dataUrl.split(',')[1]);
        const mimeType = dataUrl.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeType });
        const formData = new FormData();
        formData.append('files[0]', blob, filename || 'FloorPlan.png');
        formData.append('company_id', idCompany);
        formData.append('floor_plan', floorPlan);
        router.post(route('admin.floor.plan.upload'), formData, {
          onSuccess: () => {
            //
          },
          onError: (errors) => {
            console.error('Error uploading image:', errors);
          },
        });
      })
      .catch((err) => {
        console.error('Error capturing the div as an image', err);
      });
  }, [imageContainerRef, idCompany, image]);

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          Process Steps
        </h2>
      }
    >
      <Head title="Manage Flow Chart" />
      <div className="mx-auto max-w-7xl">
        <div className="w-full rounded-md">
          <div className="flex flex-wrap justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
            <h1 className="text-xl font-bold mb-4 md:mb-0">
              Create A Floor Plan
            </h1>
            <div className="flex justify-end gap-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="imageUpload"
                onChange={handleImageUpload}
              />
              <CommonButton
                variant="outlined"
                className="font-bold"
                onClick={() =>
                  router.get(
                    route('admin.company.floor.plan', { company: companyId })
                  )
                }
              >
                Back
              </CommonButton>

              <CommonButton
                variant="outlined"
                className="font-bold"
                onClick={() => document.getElementById('imageUpload')?.click()}
              >
                Upload Image
              </CommonButton>
              <CommonButton
                onClick={downloadAndSendImage}
                className="!border-orange-400 hover:text-white hover:!bg-gradient-org-red"
                variant="success"
              >
                Save
              </CommonButton>
            </div>
          </div>
        </div>
        <div className="p-0 bg-white">
          <div className="md:flex md:gap-4 lg:gap-8 justify-between">
            <div
              ref={imageContainerRef}
              className="relative md:w-6/12 lg::w-7/12 p-4"
              style={{ width: '100%', paddingBottom: '50px' }}
            >
              <img
                src={image || `${baseUrl}/default-image.png`}
                alt="Uploaded"
                className="w-4/5	mx-auto"
              />
              <div className=" bottom-0 left-0 w-full  bg-white text-black  p-8">
                <div>
                  <h3 className="font-bold text-2xl mb-8">Map Points</h3>
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {inputFields.map((field, index) => (
                      <div
                        key={index}
                        className="text-base flex font-medium mb-1"
                      >
                        <b className="mr-1">{index + 1}.</b>
                        <span className="text-base">{field}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {labels.map((label) => (
                <Draggable
                  key={label.id}
                  position={{ x: label.x, y: label.y }}
                  onDrag={(e, ui) => handleDrag(e, ui, label.id)}
                >
                  <div
                    className="absolute p-2 bg-yellow-300 text-black rounded-full cursor-pointer flex items-center group"
                    style={{ left: `${label.x}px`, top: `${label.y}px` }}
                  >
                    <span>{label.id}</span>
                    <button
                      className="ml-2 text-red-600 hover:text-red-800"
                      onClick={() => handleRemoveLabel(label.id)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </Draggable>
              ))}

              {routes.map((route) => (
                <Draggable
                  key={route.id}
                  position={{ x: route.x, y: route.y }}
                  onDrag={(e, ui) => handleDragRoute(e, ui, route.id)}
                >
                  <div
                    className="absolute p-2 bg-green-300 text-black rounded-full cursor-pointer flex items-center group"
                    style={{ left: `${route.x}px`, top: `${route.y}px` }}
                  >
                    <span>{route.id}</span>
                    <MdArrowForward className="ml-2" />
                    <button
                      className="ml-2 text-red-600 hover:text-red-800"
                      onClick={() => handleRemoveRoute(route.id)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </Draggable>
              ))}
            </div>

            <div className="md:w-6/12 lg:w-5/12 	bg-gray-50 p-4 flex flex-col gap-2 m-4 rounded-lg ">
              <div className="h-screen	 overflow-y-auto">
                {inputFields.map((input, index) => (
                  <div key={index} className="flex p-1 items-center gap-2">
                    <span>{index + 1}.</span>
                    <TextInput
                      type="text"
                      value={input}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder={`Label ${index + 1}`}
                      className="border p-2 rounded w-full bg-white"
                    />
                    <button
                      className="bg-green-100 text-green-800 text-white p-2 rounded "
                      onClick={() => handleAddLabel(index)}
                    >
                      <FaPlus className="w-3 h-3" />
                    </button>
                    <button
                      className="bg-red-100 text-red-800 text-white p-2 rounded "
                      onClick={() => handleRemoveInput(index)}
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="bg-gradient-org-red text-white p-2 rounded-md"
                onClick={handleAddInput}
              >
                ADD POINT
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
