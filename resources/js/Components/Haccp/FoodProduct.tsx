import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Switch from '@mui/material/Switch';
import CommonButton from '../CommonButton';
import { usePage } from '@inertiajs/react';

const FoodProductIndex = ({
  producedFood,
  onToggle,
  setIsEditing,
  isEditing,
}: any) => {
  const url = usePage().props.auth;

  const role = (url as any).roles[0];

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
        <div>
          <h2 className="text-xl font-bold">Produced / served / sold food</h2>
          <h3 className="text-base font-normal">
            Business unit makes the following food products:
          </h3>
        </div>
        <div className="flex justify-end items-center gap-2">
          <CommonButton
            onClick={() => setIsEditing((prev: any) => !prev)}
            variant="outlined"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </CommonButton>
          {role !== 'admin' && (
            <CommonButton
              className="!border-orange-400 hover:text-white	hover:!bg-gradient-org-red"
              variant="outlined"
              href={route('haccp')}
            >
              Back
            </CommonButton>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="md:grid md:grid-cols-2 gap-4">
          {producedFood.map((food: any) => (
            <div
              key={food.food_product_id}
              className="grid grid-cols-2 gap-4 items-center mt-2 shadow bg-slate-50 py-2 px-4 md:px-8 rounded-md"
            >
              <div className="flex items-center">
                <p className="text-sm">{food.product}</p>
                {food.description && (
                  <span className="ml-2">
                    <InfoOutlinedIcon
                      className="text-gray-500"
                      titleAccess={food.description}
                    />
                  </span>
                )}
              </div>

              <div className="col-span-1 flex justify-end">
                <Switch
                  checked={Boolean(food.is_active)}
                  onChange={() =>
                    onToggle(food.food_product_id, !food.is_active)
                  }
                  color="warning"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-300 p-5">
        <div className="flex justify-end space-x-4 mt-4">
          <CommonButton className="p-2 rounded" type="submit" variant="success">
            Update
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default FoodProductIndex;
