#pragma once
#include <vector>
#include <string>

struct Task {
	Task(std::string t_name, int prio) : 
		task_name(t_name), priority(prio) {};

	std::string task_name;
	int priority;
};

class TaskList {
	std::vector<Task> t_list;

	public:
		TaskList();
		~TaskList();

		TaskList(std::vector<std::string> tasks);
		void addTask(std::string task, int priority = -1);
		void removeTask(std::string task, int priority = -1);
		void printTasks();
		std::vector<Task> getTasks();
};
