import React, { useState } from 'react';
import { ChevronRight, ExpandMore } from '@mui/icons-material';

interface FolderComponentProps {
  folderName: string;
  childrenFolders: { name: string }[];
  onEdit: () => void;
  onDelete: () => void;
  onAddChild: () => void;
}

const FolderComponent: React.FC<FolderComponentProps> = ({
  folderName,
  childrenFolders,
  onEdit,
  onDelete,
  onAddChild,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFolder = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="py-2" draggable={false}>
      <div>
        <div className="d-flex align-items-center justify-content-between hover-gray font-weight-bold">
          <span
            className="d-flex align-items-center folder-name"
            onClick={toggleFolder}
            style={{ cursor: 'pointer' }}
          >
            <span className="arrow-icon">
              {isExpanded ? <ExpandMore /> : <ChevronRight />}
            </span>
            <i className="fd-folder-svg ml-2 mr-2"></i>
            <span>{folderName}</span>
          </span>
          <button className="btn icon-green display-hover" onClick={onEdit}>
            <i className="icon-green fd-edit"></i>
          </button>
          <button className="btn icon-green display-hover" onClick={onDelete}>
            <i className="fd-trash"></i>
          </button>
        </div>

        {isExpanded && (
          <div className="children-container ml-4">
            {childrenFolders.map((child, index) => (
              <div
                key={index}
                className="d-flex align-items-center justify-content-between hover-gray"
              >
                <span className="d-flex align-items-center folder-name">
                  <i className="fd-folder-svg ml-2 mr-2 child-folder"></i>
                  <span>{child.name}</span>
                  <button
                    className="btn icon-green display-hover"
                    onClick={onEdit}
                  >
                    <i className="icon-green fd-edit"></i>
                  </button>
                </span>
                <button
                  className="btn icon-green display-hover"
                  onClick={onDelete}
                >
                  <i className="fd-trash"></i>
                </button>
              </div>
            ))}
            <div>
              <button
                id="add-folder"
                className="btn btn-text add-child"
                onClick={onAddChild}
              >
                Add folder
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderComponent;
