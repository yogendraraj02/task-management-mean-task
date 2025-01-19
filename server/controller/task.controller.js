const Task = require('../models/task.model')
const User = require('../models/user.model')
const errorHandlerr = require('../utils/error')

exports.createTask = async (req, res, next) => {
    try {
        const token = req.user;
        const { title, description } = req.body
        let { userId } = req.query
        if (!title || !description) {
            return res.status(400).json({ status: false, message: "title & description are required" });
        }
        const assignedByData = await User.findById({ _id: token.id });
        const assignedTo = userId?userId:token.id // assigned to self
        const taskData = new Task({
            title: title,
            assignedBy: assignedByData._id,
            description: description,
            assignedTo: assignedTo
        });

        taskData.save().then(result => {
            return res.json({ status: true, message: "succesfully added", data: result })
        })

    } catch (e) {
        return res.json({ message: e.message });
    }

}

exports.updateTaskStatus = async (req, res) => {
    try {
        const { id,title, description, status } = req.body
        const updateTask = await Task.findByIdAndUpdate({ _id: id }, {title, description, status });
        return res.send({
            status: true,
            message: "Task updated!",
            data: updateTask
        });
    } catch (e) {
        return res.status(500).json({ status: false, message: e.message });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        await Task.findByIdAndDelete(id);
        return res.send({
            status: true,
            message: "Task deleted!",
            data: []
        });
    } catch (e) {
        return res.status(500).json({ status: false, message: e.message });
    }
}

exports.getTaskList = async (req, res) => {
    const token = req.user;
    const { userId } = req.query;
    try {
        const user_id = userId || token.id;
        // const tasks = await Task.find({ assignedTo: user_id });
        const tasks = await Task.find({ assignedTo: user_id })
            .populate('assignedTo', 'name email role') // Replace 'name email' with required fields
            .populate('assignedBy', 'name email role');
        return res.json({
            status: true,
            message: 'Tasks fetched successfully',
            data: tasks,
        });
    } catch (e) {
        return res.status(500).json({ status: false, message: e.message });
    }
};

exports.taskDetails = async (req, res) => {
    const token = req.user;
    const { taskId } = req.query;
    try {
        const tasks = await Task.findById({ _id: taskId })
            .populate('assignedTo', 'name email role')
            .populate('assignedBy', 'name email role');
        return res.json({
            status: true,
            message: 'Tasks details fetched successfully',
            data: tasks,
        });
    } catch (e) {
        return res.status(500).json({ status: false, message: e.message });
    }
};

exports.getTeamLeadsWithTasks = async (req, res) => {
    try {
        const token = req.user
        const teamLeads = await User.find({ role: 'teamLead', managerId: token.id }).select('id username email role');
        return res.json({
            status: true,
            message: 'Team leads fetched successfully',
            data: teamLeads,
        });
    } catch (e) {
        return res.status(500).json({ status: false, message: e.message });
    }
};


exports.getEmployeeList = async (req, res) => {
    try {
        const token = req.user
        console.log(token.id)
        const employees = await User.find({ role: 'employee', teamLeadId: token.id }).select('id username email role');
        console.log(employees)

        return res.json({
            status: true,
            message: 'Employees fetched successfully',
            data: employees,
        });
    } catch (e) {
        return res.status(500).json({ status: false, message: e.message });

    }
};