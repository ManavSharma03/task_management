/**
 * @description task functionality file
 * @author Manav Sharma
 * @since 22 December 2020
 */

const db = require('../task_db');

async function task(req, res, next){
    const action = req.params.action;
    const data = req.body;

    //add task
    if ( action == 'add'){
        const task = new db.taskModel(
            data
        );
        try {
            await task.save();
            res.send({message: 'task added', code: 200});
        } catch (error) {
            res.send({error: error})
        }
    }
    //delete task
    if ( action == 'delete'){
        try {
            const taskDelete = await db.taskModel.findOneAndDelete({
                _id: data.taskRef,
            });
            if (!taskDelete){
                res.send({error: 'Task Id not found'});
            }
            res.send({message: 'task deleted', code: 200});
        } catch (error) {
            res.send({error: error})
        }
    }
    //update task
    if ( action == 'update'){
        try {
            const taskUpdate = await db.taskModel.findOneAndUpdate({
                _id: data.taskRef,
            },
                data.data
            );
            console.log(taskUpdate);
            res.send({message: 'task updated', code: 200});
            if (!taskUpdate){
                res.send({error: 'Task Id not found'});
            }
        } catch (error) {
            res.send({error: error})
        }
    }
    //list tasks for a particular user
    if ( action == 'list'){
        try {
            const taskList = await db.taskModel.find({
                userRef: data.userRef,
            }).sort( { completed: 1 } );
            //
            res.send({message: 'task list', code: 200, data: taskList});
            if (!taskList){
                res.send({error: 'User not found'});
            }
        } catch (error) {
            res.send({error: error})
        }
    }
}

module.exports.task = task;