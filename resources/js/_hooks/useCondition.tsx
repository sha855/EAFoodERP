import { ReactNode, useState } from 'react';

interface UseConditionProps {
  conditionList: {
    [key: string]: string | ReactNode | any;
  };
  defaultActive: keyof UseConditionProps['conditionList'];
}

export default function useCondition({
  conditionList,
  defaultActive,
}: UseConditionProps) {
  const [activeCondition, setActiveCondition] = useState<string>(
    defaultActive as string
  );
  const RenderElement = (): string | ReactNode | any => {
    return conditionList[activeCondition];
  };
  return { RenderElement, setActiveCondition, activeCondition };
}
