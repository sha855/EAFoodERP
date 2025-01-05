import { usePage } from '@inertiajs/react';
import CommonButton from '../CommonButton';

export default function FoodProductionView({
  translations,
  data,
  companyFoodProduced,
  setIsEditing,
  isEditing,
  anotherCompanyServe,
  anotherCompanyData
}: any) {
  const url = usePage().props.auth;

  const role = (url as any).roles[0];

  return (
    <form>
      <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
        <h5 className="text-xl font-semibold">Food Production Volume</h5>

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


      <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-md mt-2 flex justify-center items-center">
          <h6 className="text-md font-semibold text-gray-700">
            Production/serving
          </h6>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-4 gap-20 mt-1 mb-8">
          <div>
            <p className="font-bold">Produced / served / sold food</p>
          </div>
          <div>
            <p className="font-bold">Estimated volumes</p>
          </div>
          <div>
            <p className="font-bold">Unit</p>
          </div>
          <div>
            <p className="font-bold">Period</p>
          </div>
        </div>

        {companyFoodProduced && companyFoodProduced.length > 0 ? (
          data.food_volumes.map((foodVolume: any, index: any) => (
            <div className="grid grid-cols-4 gap-10 mt-1" key={index}>
              <div className="mb-8">
                <span>{companyFoodProduced[index]?.product}</span>
              </div>
              <div>
                <span>{foodVolume.volume}</span>
              </div>
              <div>
                <span>{foodVolume.unit}</span>
              </div>
              <div>
                <span>{foodVolume.period}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p>
              No food product made, please make one. To set Food Production
              volume
            </p>
          </div>
        )}
      </div>



      {anotherCompanyServe?.is_active && (
        <>
          <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-md mt-2 justify-center items-center">
            <h6 className="text-md font-semibold text-gray-700">
            Including selling to other company
            </h6>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-4 gap-20 mt-1 mb-8">
              <div>
                <p className="font-bold">Produced / served / sold food</p>
              </div>
              <div>
                <p className="font-bold">Estimated volumes</p>
              </div>
              <div>
                <p className="font-bold">Unit</p>
              </div>
              <div>
                <p className="font-bold">Period</p>
              </div>
            </div>

            {companyFoodProduced && companyFoodProduced.length > 0 ? (
              anotherCompanyData.food_volumes.map((foodVolume: any, index: any) => (
                <div className="grid grid-cols-4 gap-10 mt-1" key={index}>
                  <div className="mb-8">
                    <span>{companyFoodProduced[index]?.product}</span>
                  </div>
                  <div>
                    <span>{foodVolume.volume}</span>
                  </div>
                  <div>
                    <span>{foodVolume.unit}</span>
                  </div>
                  <div>
                    <span>{foodVolume.period}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <p>
                  No food product made, please make one. To set Food Production
                  volume
                </p>
              </div>
            )}
          </div>

        </>
      )}

    </form>
  );
}
