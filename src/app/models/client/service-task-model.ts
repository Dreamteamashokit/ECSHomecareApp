import { BaseModel } from 'src/app/models/common';

export class TaskModel extends BaseModel {
    taskId: number;
    taskCode: string;
    taskName: string;
    taskDetail: string;
}


export class ServiceTaskModel extends BaseModel {

    taskSrvId: number;
    taskId: number;
    frequency: number;
    serviceNote: string;
    constructor(taskId: number, frequency: number, serviceNote: string) {
        super();

        this.taskId = taskId;
        this.frequency = frequency;
        this.serviceNote = serviceNote;

    }


}

export class ServiceTaskView {
    taskSrvId: number;
    userId: number;
    taskId: number;
    taskCode: string;
    taskName: string;
    frequency: number;
    serviceNote: string;
    isEdit: boolean;
}



export class ServicetaskObj {
    isChecked: boolean;
    taskId: number;
    taskCode: string;
    taskName: string;
    frequency: number;
    serviceNote: string;
    constructor(taskId: number, taskCode: string, taskName: string) {

        this.isChecked = false;
        this.taskId = taskId;
        this.taskName = taskName;
        this.taskCode = taskCode;

    }
}
