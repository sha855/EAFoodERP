import { useState, useCallback, useRef, useEffect } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import CommonButton from '@/Components/CommonButton';
import Drawer from '@/Components/Drawer';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import * as htmlToImage from 'html-to-image';
import CustomNodeFlow from '@/Components/CustomNodeFlow';
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  Node,
  Edge,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function FlowChart({
  companyId,
  riskLevels,
  flowCharts,
  initialNodes,
  initialEdges,
}: any) {
  const auth: any = usePage().props.auth;
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const nodeTypes = {
    custom: CustomNodeFlow,
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const [processName, setProcessName] = useState('');
  const reactFlowWrapper = useRef(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [imageData, setImageData] = useState(null);

  const { data, setData, post, reset, processing } = useForm({
    process_steps: [
      {
        id: Date.now(),
        process_name: processName,
        process_step: '',
        company_id: companyId || '',
        type: '',
        is_time: false,
        is_temperature: false,
        is_quality: false,
        is_recording: false,
        instruction: '',
      },
    ],
    image: imageData,
    company_id: companyId,
  });

  const mapDataToNodes = (processSteps: any) =>
    processSteps.map((step: any) => ({
      id: step.id.toString(),
      className: 'flow-node',
      data: {
        process_step: step.process_step,
        type: step.type,
        instruction: step.instruction,
        is_temperature: step.is_temperature ? '1' : '0',
        is_quality: step.is_quality ? '1' : '0',
        is_recording: step.is_recording ? '1' : '0',
      },
      position: { x: 250, y: 150 + 150 * processSteps.indexOf(step) },
      type: 'custom',
    }));

  const mapDataToEdges = (processSteps: any) =>
    processSteps.slice(0, -1).map((step: any, index: any) => ({
      id: `e${step.id}-${processSteps[index + 1].id}`,
      source: step.id.toString(),
      target: processSteps[index + 1].id.toString(),
      type: 'default',
      animated: true,
    }));

  useEffect(() => {
    const isModified = data.process_steps.some(
      (step) => step.process_step || step.type || step.instruction
    );

    if (isModified && !hasInitialized) {
      setHasInitialized(true);
    }

    if (hasInitialized) {
      const newNodes = mapDataToNodes(data.process_steps);
      const newEdges = mapDataToEdges(data.process_steps);
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [data.process_steps, hasInitialized]);

  useEffect(() => {
    if (imageData !== data.image) {
      setData('image', imageData);
    }
  }, [imageData, setData, data.image]);

  const updateProcessName = (name: string) => {
    setProcessName(name);
    const updatedSteps = data.process_steps.map((step) => ({
      ...step,
      process_name: name,
    }));
    setData('process_steps', updatedSteps);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const addField = () => {
    setData('process_steps', [
      ...data.process_steps,
      {
        id: Date.now(),
        process_name: processName,
        process_step: '',
        type: '',
        company_id: companyId,
        is_time: false,
        is_temperature: false,
        is_quality: false,
        is_recording: false,
        instruction: '',
      },
    ]);
  };

  const updateStep = (index: number, field: string, value: any) => {
    const updatedSteps = data.process_steps.map((step, idx) => {
      if (idx === index) {
        return { ...step, [field]: value };
      }
      return step;
    });
    setData('process_steps', updatedSteps);
  };

  const downloadImage = useCallback(() => {
    if (!reactFlowWrapper.current) return;

    htmlToImage
      .toPng(reactFlowWrapper.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'flowchart.png';
        link.click();
      })
      .catch((err) => {
        console.error('Error capturing flowchart as an image', err);
      });
  }, [reactFlowWrapper]);

  const captureFlowchartImage = useCallback(async () => {
    if (!reactFlowWrapper.current) return;

    await htmlToImage
      .toPng(reactFlowWrapper.current)
      .then((dataUrl) => {
        fetch(dataUrl)
          .then((res) => res.blob())
          .then((blob) => {
            const imageFile = new File([blob], processName, {
              type: 'image/png',
            });
            setImageData(imageFile as any);
          });
      })
      .catch((err) => {
        console.error('Error capturing flowchart as an image', err);
      });
  }, [setData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await captureFlowchartImage();
  };

  if (data.image !== null) {
    setTimeout(() => {
      router.post(route('flow-chart.store'), data);
      reset();
    }, 1000);
  }

  const formContent = (
    <div className="p-4 border rounded-lg">
      <div>
        <label className="block text-gray-700">Process Name</label>
        <TextInput
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          placeholder="Process Name"
          onChange={(e) => updateProcessName(e.target.value)}
          required
        />
      </div>
      {data.process_steps.map((step, index) => (
        <div key={step.id} className="mb-4">
          <hr className="my-4 border-gray-300" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Process Step</label>
              <TextInput
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Fill process step"
                required
                value={step.process_step}
                onChange={(e) =>
                  updateStep(index, 'process_step', e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-gray-700">Type</label>
              <select
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={step.type}
                onChange={(e) => updateStep(index, 'type', e.target.value)}
              >
                <option value="">Select Risk Level</option>
                {Object.entries(riskLevels).map(([key, value]: any) => (
                  <option key={key} value={key}>
                    {value} - {key}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4 items-center mb-4 mt-4">
            <label className="block text-gray-700">Control:</label>
            <label className="flex items-center space-x-1">
              <TextInput
                type="checkbox"
                checked={step.is_time}
                onChange={(e) => updateStep(index, 'is_time', e.target.checked)}
              />
              <span>Time</span>
            </label>
            <label className="flex items-center space-x-1">
              <TextInput
                type="checkbox"
                checked={step.is_temperature}
                onChange={(e) =>
                  updateStep(index, 'is_temperature', e.target.checked)
                }
              />
              <span>Temperature</span>
            </label>
            <label className="flex items-center space-x-1">
              <TextInput
                type="checkbox"
                checked={step.is_quality}
                onChange={(e) =>
                  updateStep(index, 'is_quality', e.target.checked)
                }
              />
              <span>Quality</span>
            </label>
            <label className="flex items-center space-x-1">
              <TextInput
                type="checkbox"
                checked={step.is_recording}
                onChange={(e) =>
                  updateStep(index, 'is_recording', e.target.checked)
                }
              />
              <span>Recording</span>
            </label>
          </div>

          <div className="border border-gray-300 rounded p-4 bg-gray-100 mb-4">
            <label className="block text-gray-700 mb-2">Instructions:</label>
            <textarea
              className="mt-1 p-2 border border-gray-300 rounded w-full h-24"
              placeholder="Enter instructions here..."
              required
              value={step.instruction}
              onChange={(e) => updateStep(index, 'instruction', e.target.value)}
            />
          </div>
        </div>
      ))}

      <div className="flex gap-4 mt-4">
        <CommonButton variant="outlined" type="button" onClick={addField}>
          Add New
        </CommonButton>
        <CommonButton variant="success" type="button" onClick={handleSubmit}>
          Save
        </CommonButton>
      </div>
    </div>
  );

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
      <div className="flex">
        <div className="bg-white shadow rounded w-full h-fit">
          <div className="w-full bg-white p-0 shadow rounded-md">
            <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
              <h5 className="text-xl font-semibold">Create a Flow Chart</h5>
              <div className="flex justify-end gap-2">
                <CommonButton
                  variant="text"
                  style={{
                    background:
                      'linear-gradient(90deg, #FF6F61 0%, #FF9A76 50%, #FFC785 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  className="font-bold"
                  onClick={handleDrawerOpen}
                >
                  Edit Process
                </CommonButton>
                <CommonButton
                  variant="outlined"
                  onClick={() => router.get(route('flow-chart.index'))}
                >
                  Cancel
                </CommonButton>
                <CommonButton variant="outlined" onClick={downloadImage}>
                  Download Sample
                </CommonButton>

                <CommonButton
                  className="bg-white !border-orange-400 hover:text-white hover:!bg-gradient-org-red"
                  variant="outlined"
                  href={route('haccp')}
                >
                  Back
                </CommonButton>
              </div>
            </div>
          </div>
          <div className="py-10 px-6">
            <div ref={reactFlowWrapper} style={{ height: '100vh' }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
              >
                <MiniMap />
                <Controls />
                <Background color="#aaa" gap={16} />
              </ReactFlow>
            </div>
          </div>

          <Drawer
            isDrawerOpen={isDrawerOpen}
            onClose={handleDrawerClose}
            title="Create A Flow Chart"
            formContent={formContent}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
