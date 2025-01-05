import CommonButton from '@/Components/CommonButton';
import { usePage } from '@inertiajs/react';

export default function FoodProductionEdit({
  translations,
  data,
  companyFoodProduced,
  handleSubmit,
  errors,
  estimatedVolumes,
  processing,
  setData,
  units,
  periods,
  setIsEditing,
  isEditing,
  anotherCompanyServe,
  anotherCompanyData,
  setAnotherCompanyData,
  otherCompanyErrors
}: any) {
  const url = usePage().props.auth;
  const role = (url as any).roles[0];
  const isAnotherCompany = anotherCompanyServe;

   console.log('' ,otherCompanyErrors);

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          <div className="grid grid-cols-4 gap-12 mt-1 mb-8">
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

          {data.food_volumes.map((foodVolume: any, index: any) => (
            <div className="grid grid-cols-4 gap-10 mt-1" key={index}>
              <div>
                <span>{companyFoodProduced[index].product}</span>
              </div>
              <div>
                <select
                  className={`rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-300 w-full border ${errors[`food_volumes.${index}.volume`] ? 'border-red-500' : ''}`}
                  value={foodVolume.volume}
                  onChange={(e) => {
                    const newVolumes = [...data.food_volumes];
                    newVolumes[index].volume = e.target.value;
                    setData('food_volumes', newVolumes);
                  }}
                >
                  <option value="">Select Volume</option>
                  {estimatedVolumes.map((volume: any, idx: any) => (
                    <option key={idx} value={volume}>
                      {volume}
                    </option>
                  ))}
                </select>
                {errors[`food_volumes.${index}.volume`] && (
                  <span className="text-red-500 text-sm">
                    {errors[`food_volumes.${index}.volume`]}
                  </span>
                )}
              </div>

              <div>
                <select
                  className={`rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-300 w-full border ${errors[`food_volumes.${index}.unit`] ? 'border-red-500' : ''}`}
                  value={foodVolume.unit}
                  onChange={(e) => {
                    const newUnits = [...data.food_volumes];
                    newUnits[index].unit = e.target.value;
                    setData('food_volumes', newUnits);
                  }}
                >
                  <option value="">Select Unit</option>
                  {units.map((unit: any, idx: any) => (
                    <option key={idx} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                {errors[`food_volumes.${index}.unit`] && (
                  <span className="text-red-500 text-sm">
                    {errors[`food_volumes.${index}.unit`]}
                  </span>
                )}
              </div>

              <div>
                <select
                  className={`rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-300 w-full border ${errors[`food_volumes.${index}.period`] ? 'border-red-500' : ''}`}
                  value={foodVolume.period}
                  onChange={(e) => {
                    const newPeriods = [...data.food_volumes];
                    newPeriods[index].period = e.target.value;
                    setData('food_volumes', newPeriods);
                  }}
                >
                  <option value="">Select Period</option>
                  {periods.map((period: any, idx: any) => (
                    <option key={idx} value={period}>
                      {period}
                    </option>
                  ))}
                </select>
                {errors[`food_volumes.${index}.period`] && (
                  <span className="text-red-500 text-sm">
                    {errors[`food_volumes.${index}.period`]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {isAnotherCompany?.is_active == true && (
    <>
      <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-md flex justify-center items-center">
        <h6 className="text-md font-semibold text-gray-700">
          Including selling to other company
        </h6>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-4 gap-12 mt-1 mb-8">
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

              {anotherCompanyData.food_volumes.map((foodVolume: any, index: any) => (
                <div className="grid grid-cols-4 gap-10 mt-1" key={index}>
                  <div>
                    <span>{companyFoodProduced[index].product}</span>
                  </div>
                  <div>
                    <select
                      className={`rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-300 w-full border ${errors[`anotherCompanyData.food_volumes.${index}.volume`] ? 'border-red-500' : ''}`}
                      value={foodVolume.volume}
                      onChange={(e) => {
                        const newVolumes = [...anotherCompanyData.food_volumes];
                        newVolumes[index].volume = e.target.value;
                        setAnotherCompanyData('food_volumes', newVolumes);
                      }}
                    >
                      <option value="">Select Volume</option>
                      {estimatedVolumes.map((volume: any, idx: any) => (
                        <option key={idx} value={volume}>
                          {volume}
                        </option>
                      ))}
                    </select>
                    {otherCompanyErrors[`food_volumes.${index}.volume`] && (
                      <span className="text-red-500 text-sm">
                        {otherCompanyErrors[`food_volumes.${index}.volume`]}
                      </span>
                    )}
                  </div>

                  <div>
                    <select
                      className={`rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-300 w-full border ${errors[`anotherCompanyData.food_volumes.${index}.unit`] ? 'border-red-500' : ''}`}
                      value={foodVolume.unit}
                      onChange={(e) => {
                        const newUnits = [...anotherCompanyData.food_volumes];
                        newUnits[index].unit = e.target.value;
                        setAnotherCompanyData('food_volumes', newUnits);
                      }}
                    >
                      <option value="">Select Unit</option>
                      {units.map((unit: any, idx: any) => (
                        <option key={idx} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                    {otherCompanyErrors[`food_volumes.${index}.unit`] && (
                      <span className="text-red-500 text-sm">
                        {otherCompanyErrors[`food_volumes.${index}.unit`]}
                      </span>
                    )}
                  </div>

                  <div>
                    <select
                      className={`rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-300 w-full border ${errors[`anotherCompanyData.food_volumes.${index}.period`] ? 'border-red-500' : ''}`}
                      value={foodVolume.period}
                      onChange={(e) => {
                        const newPeriods = [...anotherCompanyData.food_volumes];
                        newPeriods[index].period = e.target.value;
                        setAnotherCompanyData('food_volumes', newPeriods);
                      }}
                    >
                      <option value="">Select Period</option>
                      {periods.map((period: any, idx: any) => (
                        <option key={idx} value={period}>
                          {period}
                        </option>
                      ))}
                    </select>
                    {otherCompanyErrors[`food_volumes.${index}.period`] && (
                      <span className="text-red-500 text-sm">
                        {otherCompanyErrors[`food_volumes.${index}.period`]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="p-6 border-t border-slate-300">
          <div className="flex justify-end gap-2 mt-0">
            <CommonButton
              variant="success"
              className="bg-green-500 text-white hover:bg-darkgreen"
              type="submit"
              disabled={processing}
            >
              {processing ? 'Saving...' : 'Save'}
            </CommonButton>
          </div>
        </div>
      </form>
    </>
  );
}
