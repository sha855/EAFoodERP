import React, { useState, useEffect } from 'react';
import CommonButton from '../CommonButton';
import { usePage } from '@inertiajs/react';
import { IoIosAdd } from 'react-icons/io';
import CommonToolTip from '@/Components/CommonTooltip';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function ProcessStepIndex({
  translations,
  process,
  handleDrawerOpen,
  handleActiveProcessSubmit,
  isEditing,
  toggleEdit,
  activeProcessData,
  setactiveProcessData,
  inactiveProcessData,
  setInactiveProcessData,
  handleCombinedProcessSubmit
}: any) {

const url = usePage().props.auth;
const role = (url as any).roles[0];
const handleActivityCheck = (procIndex: number, activityIndex: number) => {
    const updatedProcessData = [...activeProcessData.processes];
    const currentActivity = updatedProcessData[procIndex].activities[activityIndex];
    currentActivity.is_active = !currentActivity.is_active;
    const allActivitiesInactive = updatedProcessData[procIndex].activities.every(
        (activity: any) => !activity.is_active
    );
    updatedProcessData[procIndex].is_active = !allActivitiesInactive;
    setactiveProcessData({ processes: updatedProcessData });
};

const handleParentCheck = (procIndex: number) => {
    const updatedProcessData = [...activeProcessData.processes];
    const currentProcess = updatedProcessData[procIndex];
    currentProcess.is_active = !currentProcess.is_active;
    currentProcess.activities.forEach((activity: any) => {
        activity.is_active = currentProcess.is_active;
    });
    setactiveProcessData({ processes: updatedProcessData });
};

const handleInActivityCheck = (procIndex: number, activityIndex: number) => {
    const updatedProcessData = inactiveProcessData.processes.map((proc : any, index : any) => {
        if (index === procIndex) {
            const updatedActivities = proc.activities.map((activity : any, actIndex : any) => {
                if (actIndex === activityIndex) {
                    return { ...activity, is_active: !activity.is_active };
                }
                return activity;
            });
            const allActivitiesInactive = updatedActivities.every((activity : any) => !activity.is_active);
            return {
                ...proc,
                activities: updatedActivities,
                is_active: !allActivitiesInactive,
            };
        }
        return proc;
    });
    setInactiveProcessData({ processes: updatedProcessData });
};

const handleInParentCheck = (procIndex: number) => {
    const updatedProcessData = inactiveProcessData.processes.map((proc : any, index : any) => {
        if (index === procIndex) {
            const newStatus = !proc.is_active;
            const updatedActivities = proc.activities.map((activity : any) => ({
                ...activity,
                is_active: newStatus,
            }));
            return {
                ...proc,
                is_active: newStatus,
                activities: updatedActivities,
            };
        }
        return proc;
    });

    setInactiveProcessData({ processes: updatedProcessData });
};

const handleOnDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const updatedProcesses = Array.from(activeProcessData.processes);
    const [removed] = updatedProcesses.splice(source.index, 1);
    updatedProcesses.splice(destination.index, 0, removed);

    setactiveProcessData({ processes: updatedProcesses });
  };


  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-full bg-white mt-2 rounded shadow-sm">
        <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
          <h5 className="text-xl font-bold text-gray-800">{translations.processStep}</h5>
          <div className="flex justify-end gap-2">
            {role !== 'admin' && (
              <CommonButton
                className="!border-orange-400 hover:text-white hover:!bg-gradient-org-red"
                variant="outlined"
                href={route('haccp')}
              >
                Back
              </CommonButton>
            )}
            <CommonButton onClick={toggleEdit} variant="outlined">
              {isEditing ? 'Cancel' : 'Edit'}
            </CommonButton>
          </div>
        </div>

         <div className="p-4">
                  <h6 className="font-bold text-lg text-gray-700">Active Processes</h6>
                  {activeProcessData.processes.length > 0 ? (
                      <DragDropContext onDragEnd={handleOnDragEnd}>
                          <Droppable droppableId="active-processes">
                              {(provided) => (
                                  <div
                                      className="space-y-4"
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}
                                  >
                                      {activeProcessData.processes
                                          .map((proc: any, index: number) => (
                                              <Draggable key={proc.id} draggableId={proc.id.toString()} index={index}>
                                                  {(provided) => (
                                                      <div
                                                          className="md:grid grid-cols-12 gap-4 items-start mb-4 bg-slate-50 p-5 rounded-md relative"
                                                          ref={provided.innerRef}
                                                          {...provided.draggableProps}
                                                          {...provided.dragHandleProps}
                                                      >
                                                          <div className="col-span-4 flex items-start md:items-center space-x-2 w-10/12 md:w-full">
                                                              <p className="text-sm mb-4 md:mb-0 font-bold md:font-normal">
                                                                  {proc.custom_name || proc.name}
                                                              </p>
                                                              {proc.description && (
                                                                  <div className="relative group">
                                                                      <CommonToolTip
                                                                          className="ml-1"
                                                                          classTooltip={'w-5 h-5'}
                                                                          title={proc.description}
                                                                      />
                                                                  </div>
                                                              )}
                                                          </div>

                                                          <div className="col-span-4 flex flex-col space-y-2">
                                                              {proc.activities && proc.activities.map((activity: any, activityIndex: number) => (
                                                                  <label className="inline-flex items-center" key={activity.name + activityIndex}>
                                                                      <input
                                                                          type="checkbox"
                                                                          checked={activity.is_active === true}
                                                                          onChange={() => handleActivityCheck(index, activityIndex)}
                                                                          className="form-checkbox !text-orange-400 focus:!border-gray-300 !border-gray-200 mr-2 !w-5 !h-5 focus:ring-0"
                                                                      />
                                                                      <span className="md:ml-2 text-sm md:text-base">{activity.name}</span>

                                                                      {activity.description && (
                                                                          <div className="relative group ml-2">
                                                                              <CommonToolTip
                                                                                  className="ml-1"
                                                                                  classTooltip={'w-5 h-5'}
                                                                                  title={activity.description}
                                                                              />
                                                                          </div>
                                                                      )}
                                                                  </label>
                                                              ))}
                                                          </div>

                                                          <div className="col-span-4 flex justify-center absolute md:static top-0 right-0 m-3 md:m-0">
                                                              <label className="relative inline-flex items-center cursor-pointer">
                                                                  <input
                                                                      type="checkbox"
                                                                      className="sr-only peer"
                                                                      checked={proc.is_active === true}
                                                                      onChange={() => handleParentCheck(index)}
                                                                  />
                                                                  <div
                                                                      className={`w-11 h-6 ${proc.is_active === true ? 'bg-orange-400' : 'bg-gray-300'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer focus:ring-0 peer-checked:bg-orange-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                                                                  ></div>
                                                              </label>
                                                          </div>
                                                      </div>
                                                  )}
                                              </Draggable>
                                          ))}
                                      {provided.placeholder}
                                  </div>
                              )}
                          </Droppable>
                      </DragDropContext>
                  ) : (
                      <p className="text-gray-500">No Active Processes Available</p>
                  )}


                  <h6 className="font-bold text-lg text-gray-700 mt-8">Inactive Processes</h6>
                  {inactiveProcessData.processes.length > 0 ? (
                      <div>
                          {inactiveProcessData.processes
                              .map((proc: any, index: number) => (
                                  <div
                                      key={proc.id}
                                      className="md:grid grid-cols-12 gap-4 items-start mb-4 bg-slate-50 p-5 rounded-md relative"
                                  >
                                      <div className="col-span-4 flex items-start md:items-center space-x-2 w-10/12 md:w-full">
                                          <p className="text-sm mb-4 md:mb-0 font-bold md:font-normal">
                                              {proc.custom_name || proc.name}
                                          </p>
                                          {proc.description && (
                                              <div className="relative group">
                                                  <CommonToolTip
                                                      className="ml-1"
                                                      classTooltip={'w-5 h-5'}
                                                      title={proc.description}
                                                  />
                                              </div>
                                          )}
                                      </div>

                                      <div className="col-span-4 flex flex-col space-y-2">
                                          {proc.activities && proc.activities.map((activity: any, activityIndex: number) => (
                                              <label className="inline-flex items-center" key={activity.name + activityIndex}>
                                                  <input
                                                      type="checkbox"
                                                      checked={activity.is_active}
                                                      onChange={() => handleInActivityCheck(index, activityIndex)}
                                                      className="form-checkbox !text-orange-400 focus:!border-gray-300 !border-gray-200 mr-2 !w-5 !h-5 focus:ring-0"
                                                  />
                                                  <span className="md:ml-2 text-sm md:text-base">{activity.name}</span>

                                                  {activity.description && (
                                                      <div className="relative group ml-2">
                                                          <CommonToolTip
                                                              className="ml-1"
                                                              classTooltip={'w-5 h-5'}
                                                              title={activity.description}
                                                          />
                                                      </div>
                                                  )}
                                              </label>
                                          ))}
                                      </div>

                                      <div className="col-span-4 flex justify-center absolute md:static top-0 right-0 m-3 md:m-0">
                                          <label className="relative inline-flex items-center cursor-pointer">
                                              <input
                                                  type="checkbox"
                                                  className="sr-only peer"
                                                  checked={proc.is_active === true}
                                                  onChange={() => handleInParentCheck(index)}
                                              />
                                              <div
                                                  className={`w-11 h-6 ${proc.is_active === false ? 'bg-gray-300' : 'bg-orange-400'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer focus:ring-0 peer-checked:bg-orange-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                                              ></div>
                                          </label>
                                      </div>
                                  </div>
                              ))}
                      </div>
                  ) : (
                      <p className="text-gray-500">No Inactive Processes Available</p>
                  )}
        </div>


        <div className="flex gap-2 mb-4">
          <CommonButton
            variant="text"
            className="rounded"
            onClick={handleDrawerOpen}
          >
            <strong className="bg-gradient-org-red text-white px-2 py-2 rounded-md flex items-center justify-center">
              <IoIosAdd className="w-6 h-6" />
              Add Processes
            </strong>
          </CommonButton>
        </div>

        {/* Save Button */}
        <div className="border-t border-slate-300 p-5">
          <div className="flex justify-end space-x-4 mt-4">
            <CommonButton
              variant="success"
              className="p-2 rounded"
              onClick={handleCombinedProcessSubmit}
            >
              Save
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
