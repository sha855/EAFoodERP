import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { selectedFieldData } from '@/types/monitoringForm';

interface TicketCardProps {
  index: number;
  item: selectedFieldData;
  removeTaskFields: (id: number) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  index,
  item,
  removeTaskFields,
}) => {
  return (
    <div key={index}>
      <div className="mt-4 grid grid-cols-1 gap-6 border-b pb-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Field: Create ticket</h3>
          <MdDeleteOutline
            onClick={() => removeTaskFields(item.id)}
            className="w-6 h-6 text-lg cursor-pointer text-red-400"
          />
        </div>

        <div className="w-full">
          <p>
            Ticket is a one-time task that is assigned to a person who is
            responsible for dealing with this particular task on a one-time
            basis. This includes the following information: task description,
            assign to a person, and a possibility to attach a file. The assigned
            person will be notified about the upcoming task through the mobile
            app. Once the task has been completed, the creator of the ticket
            will be notified.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
