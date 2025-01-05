import React, {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import CommonButton from '@/Components/CommonButton';
import SwitchBtn from '@/Components/Pricing/SwitchBtn';

interface ExpandableDetailsCardProps {
  title: string;
  items: { name: string; id: number }[];
  expand: boolean;
  setExpand: (value: boolean) => void;
  renderCheckBox?: ReactNode;
  getData?: (value: UsedForDataTypes) => void;
}

interface UsedForDataTypes {
  title: string;
  data: { name: string; value: boolean; id: number }[];
}

const ExpandableDetailsCard: React.FC<ExpandableDetailsCardProps> = ({
  title,
  items,
  expand,
  setExpand,
  renderCheckBox,
  getData,
}) => {
  const [usedForData, setUsedForData] = useState<UsedForDataTypes>({
    title,
    data: [],
  });

  useEffect(() => {
    setUsedForData({
      title,
      data: items.map((item) => ({
        name: item.name,
        value: false,
        id: item.id,
      })),
    });
  }, [items, title]);

  const handleToggle = (index: number, checked: boolean, id: number) => {
    const updatedData = [...usedForData.data];
    updatedData[index].value = checked;
    setUsedForData({ ...usedForData, data: updatedData });
  };

  const returnData = useCallback(() => {
    getData && getData(usedForData);
  }, [usedForData]);
  useEffect(() => {
    returnData();
  }, [returnData]);

  return (
    <div className="!shadow-cardShadow bg-white p-5 rounded-lg mb-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg">{title}</h3>
          {!expand && (
            <div className="flex gap-2">
              <span className="text-xs bg-slate-200 p-2 whitespace-nowrap rounded-full">
                Food delivery
              </span>
              <span className="text-xs bg-slate-200 p-2 whitespace-nowrap rounded-full">
                Preparation room
              </span>
              <span className="text-xs bg-slate-200 p-2 whitespace-nowrap rounded-full">
                +11
              </span>
            </div>
          )}
        </div>

        <CommonButton
          onClick={() => setExpand(!expand)}
          className="w-28 focus:ring-0 font-bold bg-transparent !text-orange-400 hover:no-underline hover:bg-gray-200 hover:rounded-full rounded-md text-sm p-2 uppercase"
        >
          {expand ? 'Collapse' : 'Expand'}
        </CommonButton>
      </div>
      {renderCheckBox}

      {expand && (
        <div className="mt-5 h-full max-h-80 overflow-y-scroll">
          {usedForData.data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b py-3 pr-4"
            >
              <p>{item.name}</p>
              <SwitchBtn
                value={item.value}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleToggle(index, e.target.checked, item.id)
                }
                className="after:!w-5 after:!h-5 !w-12 !h-7 after:!start-[4px]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpandableDetailsCard;
