import { selectedFieldData } from '@/types/monitoringForm';
import React from 'react';
import Temperature from '@/Pages/Monitor/Form/Mobile/Detailed/Temperature';
import Date from '@/Pages/Monitor/Form/Mobile/Detailed/Date';
import Time from '@/Pages/Monitor/Form/Mobile/Detailed/Time';
import Amount from '@/Pages/Monitor/Form/Mobile/Detailed/Amount';
import Text from '@/Pages/Monitor/Form/Mobile/Detailed/Text';
import Numeric from '@/Pages/Monitor/Form/Mobile/Detailed/Numeric';
import MultipleAnswer from '@/Pages/Monitor/Form/Mobile/Detailed/MultipleAnswer';
import OneAnswer from '@/Pages/Monitor/Form/Mobile/Detailed/OneAnswer';
import Product from '@/Pages/Monitor/Form/Mobile/Detailed/Product';
import PhotoFile from '@/Pages/Monitor/Form/Mobile/Detailed/PhotoFile';
import Ticket from '@/Pages/Monitor/Form/Mobile/Detailed/Ticket';
import Timer from '@/Pages/Monitor/Form/Mobile/Detailed/Timer';

interface ComponentsMobileRendererProps {
  item: selectedFieldData;
  index: number;
}

const ComponentsMobileRenderer: React.FC<ComponentsMobileRendererProps> = ({
  item,
  index,
}) => {
  switch (item.component) {
    case 'temperature':
      return <Temperature key={index} />;
    case 'date':
      return <Date key={index} />;
    case 'time':
      return <Time key={index} />;
    case 'amount':
      return <Amount key={index} />;
    case 'text':
      return <Text key={index} />;
    case 'numeric':
      return <Numeric key={index} />;
    case 'multiple_answer':
      return <MultipleAnswer key={index} />;
    case 'one_answer':
      return <OneAnswer key={index} />;
    case 'product':
      return <Product key={index} />;
    case 'photo_file':
      return <PhotoFile key={index} />;
    case 'ticket':
      return <Ticket key={index} />;
    case 'timer':
      return <Timer key={index} />;
    default:
  }
};

export default ComponentsMobileRenderer;
