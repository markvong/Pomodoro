#include "TaskList.h"
#include <iostream>
#include <iomanip>

TaskList::TaskList() {
	//default constructor
	t_list = std::vector<Task>();
}

TaskList::~TaskList() {

}

TaskList::TaskList(std::vector<std::string> tasks) {
	for (std::string task : tasks)
		addTask(task);
}

void TaskList::addTask(std::string task, int priority) {
	Task t(task, priority);
	t_list.push_back(t);
}

void TaskList::removeTask(std::string task, int priority) {
	for (int i = 0; i < t_list.size(); i++) {
		if (t_list[i].task_name == task) {
			t_list.erase(t_list.begin() + i);
		}
	}
}

void TaskList::printTasks() {
	std::cout << std::left << std::setw(20)
		<< "Task Name";
	std::cout << std::right << std::setw(5)
		<< "Priority" << std::endl;
	for (Task t : t_list) {
		std::cout << std::left << std::setw(20)
			<< t.task_name;
		std::cout << std::right << std::setw(5)
			<< t.priority << std::endl;
	}
}

std::vector<Task> TaskList::getTasks() {
	return t_list;
}