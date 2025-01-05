import { selectedFieldData } from '@/types/monitoringForm';
import React from 'react';
import TaskFieldCard from '@/Pages/Monitor/Form/Detailed/TemperatureCard';
import DateCard from '@/Pages/Monitor/Form/Detailed/DateCard';
import TimeCard from '@/Pages/Monitor/Form/Detailed/TimeCard';
import AmountCard from '@/Pages/Monitor/Form/Detailed/AmountCard';
import TextCard from '@/Pages/Monitor/Form/Detailed/TextCard';
import NumericCard from '@/Pages/Monitor/Form/Detailed/NumericCard';
import MultipleAnswerCard from '@/Pages/Monitor/Form/Detailed/MultipleAnswerCard';
import OneAnswerCard from '@/Pages/Monitor/Form/Detailed/OneAnswerCard';
import ProductCard from '@/Pages/Monitor/Form/Detailed/ProductCard';
import PhotoFileCard from '@/Pages/Monitor/Form/Detailed/PhotoFileCard';
import TicketCard from '@/Pages/Monitor/Form/Detailed/TicketCard';
import TimerCard from '@/Pages/Monitor/Form/Detailed/TimerCard';

interface ComponentsRendererProps {
  item: selectedFieldData;
  index: number;
  uniqueId: string;
  removeTaskFields: (id: number) => void;
  UpdateTaskFieldData: (data: {
    id: number;
    field: string;
    value: any;
    nestedData?: string;
  }) => void;
  GetFieldValue: any;
  removeOptions: any;
}

const ComponentsRenderer: React.FC<ComponentsRendererProps> = ({
  item,
  index,
  uniqueId,
  removeTaskFields,
  UpdateTaskFieldData,
  GetFieldValue,
  removeOptions,
}) => {
  switch (item.component) {
    case 'temperature':
      return (
        <TaskFieldCard
          removeTaskFields={removeTaskFields}
          item={item}
          UpdateTaskFieldData={UpdateTaskFieldData}
          GetFieldValue={GetFieldValue}
        />
      );
    case 'date':
      return (
        <DateCard
          removeTaskFields={removeTaskFields}
          UpdateTaskFieldData={UpdateTaskFieldData}
          GetFieldValue={GetFieldValue}
          item={item}
        />
      );
    case 'time':
      return (
        <TimeCard
          removeTaskFields={removeTaskFields}
          UpdateTaskFieldData={UpdateTaskFieldData}
          GetFieldValue={GetFieldValue}
          item={item}
        />
      );
    case 'amount':
      return (
        <AmountCard
          removeTaskFields={removeTaskFields}
          updateAmountFieldData={UpdateTaskFieldData}
          item={item}
        />
      );
    case 'text':
      return (
        <TextCard
          removeTaskFields={removeTaskFields}
          updateTaskFieldData={UpdateTaskFieldData}
          item={item}
        />
      );
    case 'numeric':
      return (
        <NumericCard
          removeTaskFields={removeTaskFields}
          updateTaskFieldData={UpdateTaskFieldData}
          getFieldValue={GetFieldValue}
          item={item}
        />
      );
    case 'multiple_answer':
      if (
        !GetFieldValue({
          id: item.id,
          field: 'details',
          nestedField: 'options',
        })?.length
      ) {
        UpdateTaskFieldData({
          id: item.id,
          field: 'details',
          value: [
            {
              id: uniqueId,
              values: '',
            },
          ],
          nestedData: 'options',
        });
      }
      return (
        <MultipleAnswerCard
          index={index}
          item={item}
          removeTaskFields={removeTaskFields}
          UpdateTaskFieldData={UpdateTaskFieldData}
          GetFieldValue={GetFieldValue}
          removeOptions={removeOptions}
          uniqueId={uniqueId}
        />
      );
    case 'one_answer':
      if (
        !GetFieldValue({
          id: item.id,
          field: 'details',
          nestedField: 'options',
        })?.length
      ) {
        UpdateTaskFieldData({
          id: item.id,
          field: 'details',
          value: [
            {
              id: uniqueId,
              values: '',
            },
          ],
          nestedData: 'options',
        });
      }
      return (
        <OneAnswerCard
          item={item}
          uniqueId={uniqueId}
          removeTaskFields={removeTaskFields}
          UpdateTaskFieldData={UpdateTaskFieldData}
          GetFieldValue={GetFieldValue}
          removeOptions={removeOptions}
        />
      );
    case 'product':
      return (
        <ProductCard
          index={index}
          item={item}
          removeTaskFields={removeTaskFields}
          UpdateTaskFieldData={UpdateTaskFieldData}
        />
      );
    case 'photo_file':
      return (
        <PhotoFileCard
          index={index}
          item={item}
          removeTaskFields={removeTaskFields}
          UpdateTaskFieldData={UpdateTaskFieldData}
        />
      );
    case 'ticket':
      return (
        <TicketCard
          index={index}
          item={item}
          removeTaskFields={removeTaskFields}
        />
      );
    case 'timer':
      return <TimerCard index={index} item={item} />;
    default:
  }
};

export default ComponentsRenderer;
