const express = require('express');
const { ObjectId } = require('mongodb');
const {verifyToken,checkCRUDAccessForOthers} = require('../middleware/auth.middleware')
const {createTask,getTaskList,updateTaskStatus,deleteTask,getTeamLeadsWithTasks,taskDetails, getEmployeeList} = require('../controller/task.controller')
const router = express.Router();

router.post('/create-task', verifyToken,checkCRUDAccessForOthers, createTask);

router.get('/task-list',verifyToken, getTaskList);

router.get('/task-details',verifyToken, taskDetails)

router.post('/edit-task', verifyToken, updateTaskStatus);

router.delete('/delete/:id', verifyToken, deleteTask);

router.get('/get-teamleads',verifyToken, getTeamLeadsWithTasks)

router.get('/get-employees',verifyToken, getEmployeeList)

module.exports = router;
