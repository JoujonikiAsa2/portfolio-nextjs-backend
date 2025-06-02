import ApiError from "../../errors/ApiError";
import status from "http-status";
import { TSkill } from "./skill.interface";
import { Skill } from "./skill.model";

const create = async (payload: TSkill) => {
  const isSKillExist = await Skill.findOne({name: payload.name})
  if(isSKillExist){
    throw new ApiError(status.BAD_REQUEST, "Already exist")
  }
  const skill = await Skill.create({ ...payload });
  return skill;
};

const getAll = async () => {
  const skills = await Skill.find({});
  return skills;
};

const getSingle = async (id: string) => {
  const skill = await Skill.findById(id);

  if (!skill) {
    throw new ApiError(status.NOT_FOUND, "skill not found.");
  }

  return skill;
};

const update = async (id: string, payload: Partial<TSkill>) => {
  const existingskill = await Skill.findById(id);

  if (!existingskill) {
    throw new ApiError(status.NOT_FOUND, "skill not found.");
  }

  const updatedskill = await Skill.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedskill;
};

const deleteSkill = async (id: string) => {
  const existingskill = await Skill.findById(id);

  if (!existingskill) {
    throw new ApiError(status.NOT_FOUND, "skill not found.");
  }

  await Skill.findByIdAndDelete(id);

  return null;
};

export const SkillServices = {
  create,
  getAll,
  getSingle,
  update,
  deleteSkill,
};
