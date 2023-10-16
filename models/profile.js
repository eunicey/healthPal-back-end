import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: {type: String, required: true},
  sex: {type: String, enum:["M", "F"]},
  birthYear: {type: Number, required: true},
  weight: {type: Number, required: true},
  height: {type: Number, required: true},
  medicalHx: {type: String, enum:["Hypertension", "Diabetes", "Hyperlipidemia", "Gastric Reflux", "Cancer", "Gout", "Other"]}
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
