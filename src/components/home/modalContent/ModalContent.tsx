"use client";
import React, { useCallback, useContext, useEffect, useState } from 'react'
// components
import Modal from '@/components/common/modal';
import TaskDetails from '../taskDetails';

// context providers
import { TaskContext } from '@/providers/task/Task.context';

const ModalContent = () => {
  const { task, actions } = useContext(TaskContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (task?.title !== "") setShowModal(true);
  }, [task]);

  const handleCloseModal = useCallback(() => {
    actions.clearTask();
    setShowModal(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal show={showModal} onClose={handleCloseModal}>
      <TaskDetails />
    </Modal>
  )
}

export default ModalContent;