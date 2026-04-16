import mongoose from "mongoose";
import Task from "../models/task.model.js";

export const createTask = async (data) => {
  return Task.create(data);
};

export const getTaskById = async (id) => {
  return Task.findById(id);
};

export const getTasks = async ({
  userId,
  page,
  limit,
  status,
  priority,
  search
}) => {

  const filter = {
    userId,
    isDeleted: false
  };

  if (status) filter.status = status;

  if (priority) filter.priority = priority;

  if (search) {
    filter.$text = {
      $search: search
    };
  }

  const skip = (page - 1) * limit;

  return Task.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

};

export const updateTask = (taskId, userId, data) =>
  Task.findOneAndUpdate(
    {
      _id: taskId,
      userId,
      isDeleted: false
    },
    data,
    { new: true }
  );

export const deleteTask = (id, userId) =>
  Task.findOneAndUpdate(
    {
      _id: id,
      userId,
      isDeleted: false,
    },
    {
      isDeleted: true
    }
  );


export const getAnalytics = async (userId = null) => {

  const matchStage = {
    isDeleted: false
  };

  if (userId) {
    matchStage.userId = new mongoose.Types.ObjectId(userId);
  }

  const result = await Task.aggregate([

    {
      $match: matchStage
    },

    {
      $facet: {

        overview: [
          {
            $group: {
              _id: null,
              totalTasks: { $sum: 1 },
              completedTasks: {
                $sum: {
                  $cond: [{ $eq: ["$status", "completed"] }, 1, 0]
                }
              },
              pendingTasks: {
                $sum: {
                  $cond: [{ $eq: ["$status", "pending"] }, 1, 0]
                }
              }
            }
          }
        ],

        statusAnalytics: [
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 }
            }
          }
        ],

        priorityAnalytics: [
          {
            $group: {
              _id: "$priority",
              count: { $sum: 1 }
            }
          }
        ],

        weeklyStats: [
          {
            $match: {
              status: "completed"
            }
          },
          {
            $group: {
              _id: {
                $dayOfWeek: "$completedAt"
              },
              completed: { $sum: 1 }
            }
          }
        ],

        monthlyStats: [
          {
            $match: {
              status: "completed"
            }
          },
          {
            $group: {
              _id: {
                $month: "$completedAt"
              },
              completed: { $sum: 1 }
            }
          }
        ]

      }

    }

  ]);

  return result[0];

};