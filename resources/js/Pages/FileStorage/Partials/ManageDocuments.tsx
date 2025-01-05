import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { PageProps } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import CommonButton from '@/Components/CommonButton';
import CommonTable from '@/Components/CommonTable';
import TableButton from '@/Components/TableButton';
import CommonToolTip from '@/Components/CommonTooltip';
import { CommonIcon } from '@/Components/CommonIcon';
import ConfirmationBox from '@/Components/ConfirmationBox';
interface MyFormData {
  sub_menu_id: string;
  name: string;
  file: File | null;
}

export default function ManageDocuments({
  folder,
  files,
  routePrefix = '',
}: PageProps & { routePrefix?: string }) {
  const { translation } = usePage<any>().props;
  const translations =
    translation['FileStorage.messages'] ||
    translation['FileStorage.Messages'] ||
    {};

  const [deleteState, setDeleteState] = useState<{
    id: number | null;
    show: boolean;
  }>({ id: null, show: false });
  const [fileInfo, setFileInfo] = useState<{ [key: number]: string }>({});

  const fileInputRef = useRef<HTMLInputElement>();
  const fileUploadRef = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const routeParams = route().routeParams;
  const queryParams = route().queryParams;

  const companyId: any = routeParams?.company;

  const [id, setId] = useState(route()?.queryParams?.id);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromQuery = params.get('id');
    if (idFromQuery) {
      setId(idFromQuery);
      setData('sub_menu_id', idFromQuery);
    }
  }, []);

  const { data, setData, transform, post, errors } = useForm<MyFormData>({
    sub_menu_id: id || '',
    name: '',
    file: null,
  });

  const handleUpdate = (id: number) => {
    if (!fileInfo[id]) {
      fileUploadRef.current[id]?.click();
    } else {
      transform((data: any) => ({
        ...data,
        id: id,
      }));

      post(route(routePrefix + 'folder.file.update', { subManageFile: id }), {
        onSuccess: () => {
          setFileInfo((prev) => ({ ...prev, [id]: '' }));
        },
        preserveState: false,
      });
    }
  };

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLSpanElement>,
    id: number
  ) => {
    e.stopPropagation();
    setFileInfo((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleFileOnChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      setFileInfo((prev) => ({ ...prev, [id]: file[0]?.name }));
      setData('file', file[0] as any);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const upload = event.target.files;
    if (upload && upload.length > 0) {
      data.file = upload[0];
      post(route(routePrefix + 'folder.file.store'), {
        onSuccess: () => {
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        },
      });
    }
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
        route(routePrefix + 'document.file.destroy', {
          subManageFile: deleteState.id,
        }),
        {
          onFinish: () => setDeleteState({ id: null, show: false }),
        }
      );
    }
  };

  const columns = [
    {
      label: translations.table.name,
      key: 'name',
      renderCell: (params: any) => {
        const { sub_menu_id, file } = params;
        const fileName = file.split('/').pop();
        const downloadUrl = route(routePrefix + 'document.download', {
          sub_menu_id: sub_menu_id,
          file: fileName,
        });
        return <a href={downloadUrl}>{fileName}</a>;
      },
      sortable: true,
    },
    {
      label: translations.table.dateModified,
      key: 'updated_at',
      sortable: true,
    },
    {
      label: 'Actions',
      key: 'actions',
      renderCell: (params: any) => {
        const { sub_menu_id, file } = params;
        const fileName = file.split('/').pop();
        const downloadUrl = route(routePrefix + 'document.download', {
          sub_menu_id: sub_menu_id,
          file: fileName,
        });

        return (
          <div key={params.id} style={{ display: 'flex', gap: '10px' }}>
            <TableButton variant="success">
              <a href={downloadUrl}>Download</a>
            </TableButton>

            <input
              ref={(el) => (fileUploadRef.current[params.id] = el)}
              type="file"
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFileOnChange(e, params.id)
              }
            />

            <TableButton
              variant="success"
              onClick={() => handleUpdate(params.id)}
            >
              <CommonToolTip
                title={
                  <>
                    <h3 className="flex items-center gap-4 p-2 ">
                      {fileInfo[params.id]}

                      <span
                        onClick={(e: React.MouseEvent<HTMLSpanElement>) =>
                          handleRemoveFile(e, params.id)
                        }
                      >
                        <CommonIcon icon={'AiOutlineCloseCircle'} />
                      </span>
                    </h3>
                  </>
                }
                placement={'top'}
                open={!!fileInfo[params.id]}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                slotProps={{
                  popper: {
                    disablePortal: true,
                  },
                  tooltip: {
                    style: {
                      backgroundColor: '#000',
                      color: '#ffffff',
                      fontSize: '13px',
                      textAlign: 'center',
                    },
                  },
                  arrow: {
                    style: {
                      color: '#000',
                    },
                  },
                }}
              >
                <h1 className="invisible"></h1>
              </CommonToolTip>
              Update
            </TableButton>
            <TableButton
              variant="outlined"
              onClick={() => handleDeleteClick(params.id)}
            >
              Delete
            </TableButton>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex-1  bg-white rounded-lg">
      <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
        <h3 className="text-xl font-bold mb-0">{folder['menu']}</h3>
        <div className="flex items-center justify-between ">
          <form name="fileUpload" id="fileUpload" encType="multipart/form-data">
            <div className="flex justify-end gap-4">
              <input
                type="hidden"
                name="sub_menu_id"
                value={id}
                onChange={(e) => setData('sub_menu_id', e.target.value)}
              />
              <input
                ref={(el: any) => (fileInputRef.current = el)}
                type="file"
                name={`file`}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <CommonButton
                style={{
                  background:
                    'linear-gradient(90deg, #FF6F61 0%, #FF9A76 50%, #FFC785 100%)',
                }}
                variant="success"
                onClick={() => fileInputRef.current?.click()}
              >
                {translations.sideBar.addFileImage}
              </CommonButton>
            </div>
            {errors.file && (
              <p className="text-red-500 text-sm">{errors.file}</p>
            )}
          </form>
        </div>
      </div>
      <div className="p-4">
        <CommonTable
          columns={columns}
          data={files}
          dataRoute={routePrefix + 'document.folder'}
          routeKeys={{
            company: companyId,
            folderName: routeParams?.folderName,
            id: queryParams?.id,
          }}
        />
      </div>
      {deleteState.show && (
        <ConfirmationBox
          Question={`Are you sure you want to delete this ${folder['menu']}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
