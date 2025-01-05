import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CommonButton from '../CommonButton';
import { usePage } from '@inertiajs/react';

const FoodProductView = ({
  producedFood,
  translation,
  isEditing,
  setIsEditing,
}: any) => {
  const activeFoodProducts = producedFood.filter((food: any) => food.is_active);

  const url = usePage().props.auth;

  const role = (url as any).roles[0];

  return (
    <div className="">
      <div className="flex flex-wrap justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
        <div className="mb-3 md:mb-2">
          <h2 className="text-xl font-bold">Produced / served / sold food</h2>
          <h3 className="text-base font-normal">
            Business unit makes the following food products:
          </h3>
        </div>
        <div className="flex justify-end gap-2">
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

      <div className="p-8">
        <div className="grid grid-cols-2 gap-4">
          {activeFoodProducts.length > 0 ? (
            activeFoodProducts.map((food: any) => (
              <div
                key={food.food_product_id}
                className="grid grid-cols-2 gap-4 items-center mt-2 shadow bg-slate-50 py-2 px-8 rounded-md"
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
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No food products added. Please Update food product by edit
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodProductView;
