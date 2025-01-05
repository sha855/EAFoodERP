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
  locationField: string[];
  routeField: string[];
  companyId: any;
}

export default function ImageAnnotation({
  baseUrl,
  locationField,
  routeField,
  companyId,
}: ImageAnnotationProps) {
  const auth: any = usePage().props.auth;

  const [labels, setLabels] = useState<Label[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [inputFields, setInputFields] = useState<string[]>(locationField || []);
  const [routeFields, setRouteFields] = useState<string[]>(routeField || []);
  const reactFlowWrapper = useRef(null);
  const imageContainerRef = useRef(null);
  const { props } = usePage();
  const idCompany = props.companyId;

  const handleAddInput = () => {
    setInputFields([...inputFields, '']);
  };

  const handleAddRouteInput = () => {
    setRouteFields([...routeFields, '']);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedFields = [...inputFields];
    updatedFields[index] = value;
    setInputFields(updatedFields);
  };

  const handleRouteInputChange = (index: number, value: string) => {
    const updatedFields = [...routeFields];
    updatedFields[index] = value;
    setRouteFields(updatedFields);
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

  const handleAddRoute = (index: number) => {
    const text = routeFields[index];
    if (text.trim() === '' || routes.some((route) => route.id === index + 1))
      return;

    const newRoute: Route = {
      id: index + 1,
      x: 100,
      y: 150,
      text,
    };
    setRoutes([...routes, newRoute]);
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

  const handleRemoveRouteInput = (index: number) => {
    const updatedFields = routeFields.filter((_, i) => i !== index);
    setRouteFields(updatedFields);
    const updatedRoutes = routes.filter((route) => route.id !== index + 1);
    setRoutes(updatedRoutes);
  };

  const [image, setImage] = useState<string | null>(
    `${baseUrl}/charts/locationPlan.png`
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
    const filename = image ? image.split('/').pop() : 'locationPlan.png';
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
        formData.append('files[0]', blob, filename || 'locationPlan.png');
        formData.append('company_id', String(idCompany));

        router.post(route('admin.location.plan.upload'), formData);
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
      <div className="container mx-auto p-4">
        <div className="w-full bg-white p-0 shadow rounded-md">
          <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
            <h1 className="text-xl font-bold">Create A Location Plan</h1>
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
                    route('admin.company.location.plan', { company: companyId })
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
        <div className="flex">
          <div
            ref={imageContainerRef}
            className="relative w-3/4 mr-4"
            style={{ width: '800px', height: '600px', paddingBottom: '50px' }}
          >
            <img
              src={image || `${baseUrl}/default-image.png`}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 left-0 w-full p-4 bg-white text-black flex gap-x-8">
              <div>
                <h5 className="font-bold">Map Points &#8226;</h5>
                <div className="flex flex-wrap gap-x-4">
                  {inputFields.map((field, index) => (
                    <div key={index} className="text-sm font-medium mb-1">
                      {index + 1}. {field}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-bold">Route &rarr;</h5>
                <div className="flex flex-wrap gap-x-4">
                  {routeFields.map((field, index) => (
                    <div
                      key={index + inputFields.length}
                      className="text-sm font-medium mb-1"
                    >
                      {index + 1 + inputFields.length}. {field}
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

          <div className="w-1/4 flex flex-col gap-2 mt-10 max-h-[550px] overflow-y-auto">
            {inputFields.map((input, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>{index + 1}.</span>
                <TextInput
                  type="text"
                  value={input}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder={`Label ${index + 1}`}
                  className="border p-2 rounded w-full"
                />
                <button
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
                  onClick={() => handleAddLabel(index)}
                >
                  <FaPlus />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                  onClick={() => handleRemoveInput(index)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <button className="text-green-600" onClick={handleAddInput}>
              ADD POINT
            </button>

            <h2 className="text-lg font-semibold mt-4">Routes</h2>
            {routeFields.map((route, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>{index + 1}.</span>
                <TextInput
                  type="text"
                  value={route}
                  onChange={(e) =>
                    handleRouteInputChange(index, e.target.value)
                  }
                  placeholder={`Route ${index + 1}`}
                  className="border p-2 rounded w-full"
                />
                <button
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
                  onClick={() => handleAddRoute(index)}
                >
                  <FaPlus />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                  onClick={() => handleRemoveRouteInput(index)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <button className="text-green-600" onClick={handleAddRouteInput}>
              ADD ROUTE
            </button>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
