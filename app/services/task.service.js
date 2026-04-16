import * as repo from "../repositories/task.repository.js";

export const createTask = async (data) => {

  return repo.createTask(data);

};

export const getTasks = async (userId, query) => {

  const {
    page = 1,
    limit = 10,
    status,
    priority,
    search
  } = query;

  return repo.getTasks({
    userId,
    page,
    limit,
    status,
    priority,
    search
  });

};

export const completeTask = async (taskId, userId) => {

  const task = await repo.getTaskById(taskId, userId);

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.status === "completed") {
    throw new Error("Task already completed");
  }

  return repo.updateTask(
    taskId,
    userId,
    {
      status: "completed",
      completedAt: new Date()
    }
  );
};


export const updateTask = async (
  taskId,
  userId,
  data
) => {

  const task = await repo.updateTask(
    taskId,
    userId,
    data
  );

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

export const deleteTask = async (taskId, userId) => {
  const task = await repo.deleteTask(
    taskId,
    userId
  );

  if (!task) {
    throw new Error("Task not found");
  }
  return true;
};


export const getAnalytics = async (userId) => {

  const data = await repo.getAnalytics(userId);

  const overview = data.overview[0];

  const completionRate =
    (overview.completedTasks / overview.totalTasks) * 100;

  const productivityScore = Math.round(
    (completionRate * 0.7)
  );

  return {
    overview: {
      ...overview,
      completionRate,
      productivityScore
    },
    statusAnalytics: data.statusAnalytics,
    priorityAnalytics: data.priorityAnalytics,
    weeklyStats: data.weeklyStats,
    monthlyStats: data.monthlyStats
  };

};