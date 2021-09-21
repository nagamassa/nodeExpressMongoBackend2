import mongoose from 'mongoose'

const StudentSchema = mongoose.Schema({
    registrationNumber: { type: Number, unique: true },
    name: String,
    grade: String,
    section: {
        type: String,
        default: 'A'
    },
    subjects: [String]
});

const student = mongoose.model('student', StudentSchema)

export default student