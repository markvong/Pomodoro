#include "TaskList.h"
#include <vector>
#include <iostream>
#include <stdlib.h>

int main() {
	std::cout << "DEBUGGING CURRENTLY";
	TaskList tl = TaskList();
	for (int i = 0; i < 10; i++) {
		int t = rand() % 10;
		tl.addTask(std::to_string(t), t);
	}
	std::cout << "Printing tasks\n";
	tl.printTasks();
	tl.addTask("Debug", 10);
	tl.printTasks();
	tl.removeTask("Debug");
	tl.printTasks();

	return 1;
}