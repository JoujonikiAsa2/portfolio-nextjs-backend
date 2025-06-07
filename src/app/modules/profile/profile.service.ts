import ApiError from "../../errors/ApiError";
import status from "http-status";
import { TProfile } from "./profile.interface";
import { Profile } from "./profile.model";

const create = async (payload: TProfile) => {
  const profile = await Profile.create({ ...payload });
  return profile;
};

const getAll = async () => {
  const profiles = await Profile.findOne({}).sort({ createdAt: -1 });
  return profiles;
};

const getSingle = async (id: string) => {
  const profile = await Profile.findById(id);

  if (!profile) {
    throw new ApiError(status.NOT_FOUND, "Profile not found.");
  }

  return profile;
};

const update = async (id: string, payload: Partial<TProfile>) => {
  const existingProfile = await Profile.findById(id);

  if (!existingProfile) {
    throw new ApiError(status.NOT_FOUND, "Profile not found.");
  }

  const updatedprofile = await Profile.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedprofile;
};

const deleteprofile = async (id: string) => {
  const existingProfile = await Profile.findById(id);

  if (!existingProfile) {
    throw new ApiError(status.NOT_FOUND, "Profile not found.");
  }

  await Profile.findByIdAndDelete(id);

  return null;
};

const downloadResumeClickedCount = async (id: string) => {
  const existingProfile = await Profile.findById(id);

  if (!existingProfile) {
    throw new ApiError(status.NOT_FOUND, "Profile not found.");
  }
  const updatedCount = await Profile.findByIdAndUpdate(
    id,
    { clickedCount: existingProfile?.clickedCount + 1 },
    {
      new: true,
    }
  );
  return updatedCount
};

export const ProfileServices = {
  create,
  getAll,
  getSingle,
  update,
  deleteprofile,
  downloadResumeClickedCount
};
