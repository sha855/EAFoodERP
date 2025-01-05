import CommonButton from '@/Components/CommonButton';
import AddIcon from '@mui/icons-material/Add';
import { IoMdClose, IoMdInformationCircleOutline } from 'react-icons/io';
import CommonTable from '@/Components/CommonTable';
import CommonDrawer from '@/Components/CommonDrawer';
import ConfirmationBox from '@/Components/ConfirmationBox';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/_hooks/useStore';
import { closeDrawer, openDrawer } from '@/store/slice/stateSlice';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import SwitchBtn from '@/Components/Pricing/SwitchBtn';
import TableButton from '@/Components/TableButton';
import CreateEquipmentSetup from '@/Pages/Setup/Equipment/Partials/CreateEquipmentSetup';

interface RoomSetupProps {
  types: string[];
  rooms?: any;
  equipments?: any;
  routePrefix?: string;
}

export default function Equipments({
  types,
  rooms,
  equipments,
  routePrefix,
}: RoomSetupProps) {
  const { drawer } = useAppSelector((state) => state.state);
  const dispatch = useAppDispatch();
  const [openAlert, setAlertOpen] = React.useState(true);
  const [edit, setEdit] = useState<any>(null);
  const [deleteState, setDeleteState] = useState<{
    id: number | null;
    show: boolean;
  }>({ id: null, show: false });

  const { translation, locale } = usePage().props;
  const [translationData, setTranslationsData] = useState<any>(translation);
  const translations = translationData['Setup.Equipment'] || {};

  const queryParams = route().queryParams;
  const routeParams = route().routeParams;
  const companyId = routeParams?.company;

  const handleDrawerOpen = () => dispatch(openDrawer());
  const handleDrawerClose = () => {
    setEdit(null);
    dispatch(closeDrawer());
  };

  const handleDeleteClick = (id: number) => {
    setDeleteState({ id, show: true });
  };

  const handleCancelDelete = () => {
    setDeleteState({ id: null, show: false });
  };

  const handleConfirmDelete = () => {
    if (deleteState.id !== null) {
      router.delete(
        route(routePrefix + 'equipment.destroy', { equipment: deleteState.id }),
        {
          onFinish: () => setDeleteState({ id: null, show: false }),
        }
      );
    }
  };

  const handleIsUse = async (data: any) => {
    const response = await axios.post(
      route(routePrefix + 'equipment.isUse', { equipment: data.id }),
      { is_use: data.is_use }
    );
    if (response) filterEquipmentHandle(queryParams?.search);
  };

  const columns = [
    { label: translations?.columns?.name, key: 'name', sortable: true },
    { label: translations?.columns?.type, key: 'type', sortable: true },
    {
      label: translations?.columns?.room,
      key: 'room_id',
      renderCell: (params: any) => {
        return params?.room?.name;
      },
    },
    {
      label: translations?.columns?.is_use,
      key: 'is_use',
      renderCell: (params: any) => {
        return (
          <SwitchBtn
            value={params?.is_use}
            onChange={(e) =>
              handleIsUse({ ...params, is_use: e.target.checked })
            }
            className=" after:!w-5 after:!h-5 !w-12	!h-7	after:!start-[4px]"
          />
        );
      },
    },
    {
      label: translations?.columns?.actions,
      key: 'actions',
      renderCell: (params: any) => (
        <div className="flex gap-2 justify-center items-center">
          <TableButton variant="success" onClick={() => setEdit(params)}>
            <span>{translations?.columns?.edit}</span>
          </TableButton>
          <TableButton
            variant="outlined"
            onClick={() => handleDeleteClick(params.id)}
          >
            {translations?.columns?.delete}
          </TableButton>
        </div>
      ),
    },
  ];

  const param = {
    ...(routeParams?.company ? { company: routeParams?.company } : {}),
  };

  const filterEquipmentHandle = (name: string) => {
    router.get(
      route(routePrefix + 'equipment.index', param),
      {
        page: queryParams?.page,
        per_page: queryParams?.per_page,
        search: name,
      },
      {
        preserveState: true,
        preserveScroll: true,
      }
    );
  };

  return (
    <>
      <div className="flex-1 bg-white rounded-lg">
        <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
          <h3 className="text-xl font-bold"> {translations?.name}</h3>
          <CommonButton onClick={handleDrawerOpen} variant="success">
            <AddIcon /> {translations?.addButton}
          </CommonButton>
        </div>
        <div className="p-3">
          {openAlert && (
            <div className="bg-green-200 border border-green-400 text-black p-3 rounded-md mb-4 relative flex  justify-between">
              <div className="flex  justify-between gap-4">
                <div className="w-8 text-center flex justify-center">
                  <IoMdInformationCircleOutline className="h-6 w-6" />
                </div>
                <div className="pr-3">
                  <p className="mb-0 text-sm">
                    {translations?.alert?.full} {translations?.alert?.short}
                  </p>
                </div>
              </div>
              <div className="w-8 text-center flex justify-center items-center">
                <IoMdClose
                  onClick={() => setAlertOpen(false)}
                  className="h-5 w-5 cursor-pointer"
                />
              </div>
            </div>
          )}

          <div className="md:flex items-center justify-end gap-3 mt-5">
            <div>
              <select
                value={queryParams?.search}
                onChange={(e) => filterEquipmentHandle(e.target.value)}
                name="filterRoom"
                className="!border-0 !bg-slate-100  !text-black text-sm rounded-lg !ring-0 !ring-offset-0 	 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
                <option value="2" selected>
                  {translations?.filter?.all}
                </option>
                <option value="1">{translations?.filter?.active}</option>
                <option value="0">{translations?.filter?.deactivated}</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <CommonTable
              columns={columns}
              data={equipments}
              dataRoute={routePrefix + 'equipment.index'}
              routeKeys={{ company: companyId }}
            />
          </div>
        </div>
      </div>

      <CommonDrawer
        title="Equipment setup"
        isDrawerOpen={drawer || !!edit}
        onClose={handleDrawerClose}
      >
        <CreateEquipmentSetup
          edit={edit}
          types={types}
          rooms={rooms}
          setEdit={setEdit}
          routePrefix={routePrefix}
        />
      </CommonDrawer>

      {deleteState.show && (
        <ConfirmationBox
          Question="Are you sure you want to delete this equipment?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
}
