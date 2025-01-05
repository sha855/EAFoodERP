import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

function CustomNodeFlow({ data }: any) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex">
        <div className="ml-2">
          <div className="flex space-x-2 text-lg font-bold">
            <span>{data.process_step}</span>
            <span className="text-gray-500 bg-teal-100 px-2 py-1 rounded">
              {data.type}
            </span>
          </div>
          <div className="text-gray-500 text-sm break-words max-w-xs">
            {data.instruction}
          </div>
          <div>
            Control:
            {data.is_temperature === '1' && <span> Temperature, </span>}
            {data.is_quality === '1' && <span> Quality, </span>}
            {data.is_recording === '1' && <span> Recording </span>}
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500"
      />
    </div>
  );
}

export default CustomNodeFlow;
