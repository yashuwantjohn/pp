const mongoose = require('mongoose')
const { Schema } = mongoose;

const lessonSchema = new Schema({
    title : { type: String, required: true },
    contentUrl : { type: String, required:true},
    duration: { type: Number}
});

const courseSchema = new Schema ({
    title : { type: String, required: true, unique: true},
    description : { type: String, required: true },
    instructionID : { type: Schema.Types.ObjectId, ref: 'User'},
    category : { type: String, required: true},
    price: { type: Number, required: true, min:0},
    lessons: [lessonSchema]
});

const progressSchema = new Schema ({
    lessonId : { type: Schema.Types.ObjectId, ref: 'Lesson'},
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed']},
    completedAt: {type: Date, default: Date.now}
});

const enrollmentSchema = new Schema ({
    studentId : {type: Schema.Types.ObjectId, ref: 'User'},
    courseId: { type: Schema.Types.ObjectId, ref: 'Course'},
    enrollmentAt: { type: Date, default: Date.now},
    progress: [progressSchema]
});

const Course = mongoose.model('Course', courseSchema);
const Enrollment = mongoose.model('Enrollment',enrollmentSchema);

module.exports = {
    Course, Enrollment
};