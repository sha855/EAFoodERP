import React, { Dispatch, SetStateAction, useState } from 'react';
import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import CommonButton from '@/Components/CommonButton';
import CommonDrawer from '@/Components/CommonDrawer';
import { useAppDispatch, useAppSelector } from '@/_hooks/useStore';
import { closeDrawer, openDrawer } from '@/store/slice/stateSlice';
import DocumentShare from '@/Components/Form/DocumentShare';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { InfoIcon } from 'lucide-react';
import CommonTable from '@/Components/CommonTable';
import TableButton from '@/Components/TableButton';
import ConfirmationBox from '@/Components/ConfirmationBox';
import { RiListSettingsLine } from 'react-icons/ri';
export default function ShareDocuments({
  sharedDocuments,
  setIsMobileActive,
  isMobileActive,
  routePrefix = '',
}: PageProps & {
  routePrefix?: string;
  setIsMobileActive: Dispatch<SetStateAction<boolean>>;
  isMobileActive: Boolean;
}) {
  const { drawer } = useAppSelector((state) => state.state);
  const dispatch = useAppDispatch();
  const [deleteState, setDeleteState] = useState<{
    id: number | null;
    show: boolean;
  }>({ id: null, show: false });

  const routeParams = route().routeParams;
  const companyId: any = routeParams?.company ?? 0;
  const handleDrawerOpen = () => {
    dispatch(openDrawer());
  };

  const handleDrawerClose = () => {
    dispatch(closeDrawer());
  };

  const { translation } = usePage<any>().props;
  const translations =
    translation['FileStorage.messages'] ||
    translation['FileStorage.Messages'] ||
    {};

  const handleDeleteClick = (id: number) => {
    setDeleteState({ id, show: true });
  };

  const handleCancelDelete = () => {
    setDeleteState({ id: null, show: false });
  };

  const handleConfirmDelete = () => {
    if (deleteState.id !== null) {
      router.delete(
        route(routePrefix + 'document.shareAccesses.destroy', {
          sharedDocument: deleteState.id,
        }),
        {
          onFinish: () => setDeleteState({ id: null, show: false }),
        }
      );
    }
  };

  const columns = [
    { label: translations.table.name, key: 'name', sortable: true },
    { label: translations.table.email, key: 'email', sortable: true },
    { label: translations.table.sent, key: 'created_at', sortable: true },
    {
      label: translations.table.validUntil,
      key: 'access_valid_until',
      sortable: true,
    },
    {
      label: 'Actions',
      key: 'actions',
      renderCell: (params: any) => {
        return (
          <div key={params.id} style={{ display: 'flex', gap: '10px' }}>
            <TableButton
              variant="outlined"
              onClick={() => handleDeleteClick(params.id)}
            >
              Cancel
            </TableButton>
          </div>
        );
      },
    },
  ];

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div className="flex-1 ">
        <button
          type="button"
          onClick={() => setIsMobileActive(!isMobileActive)}
          className="flex items-center justify-center gap-1 text-white bg-gradient-org-red mb-4 px-2 py-2 rounded-md lg:hidden text-sm"
        >
          <RiListSettingsLine className="w-4 h-4" />
          Menu
        </button>

        <div className="bg-white rounded-lg">
          <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
            <h3 className="text-xl font-bold">
              {translations.sideBar.shareDocuments}
            </h3>
            <div className="flex gap-4">
              <CommonButton
                style={{
                  background:
                    'linear-gradient(90deg, #FF6F61 0%, #FF9A76 50%, #FFC785 100%)',
                }}
                variant="success"
                onClick={handleDrawerOpen}
              >
                {translations.sideBar.shareAccess}
              </CommonButton>
            </div>
          </div>
          <div className="p-4">
            <>
              {isVisible && (
                <div
                  className={`bg-green-200 border border-green-400 text-black p-4 rounded-md mb-4 relative flex items-start`}
                >
                  <InfoIcon className="w-5 h-5  mr-3 " />
                  <div className="flex-1">
                    <h2 className="text-sm font-medium text-black">
                      {translations.share.warning}
                    </h2>
                  </div>
                  <IconButton
                    onClick={handleClose}
                    className=" text-gray-600 hover:text-gray-900 !p-0"
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              )}
            </>

            <h3 className="text-xl font-bold mb-2">
              {translations.sideBar.activeShares}
            </h3>

            <CommonTable
              columns={columns}
              data={sharedDocuments}
              dataRoute={routePrefix + 'document.fileStorage'}
              routeKeys={{ company: companyId }}
            />
          </div>
        </div>
      </div>
      {deleteState.show && (
        <ConfirmationBox
          Question="Are you sure you canceled this access?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <CommonDrawer
        title={translations.drawer.documentSharing}
        isDrawerOpen={drawer}
        onClose={handleDrawerClose}
      >
        <DocumentShare
          companyId={companyId}
          translations={translations as any}
        />
      </CommonDrawer>
    </>
  );
}
