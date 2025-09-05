const taskInput = document.getElementById('taskInput');
        const dueDateInput = document.getElementById('dueDateInput');
        const listTask = document.getElementById('task-list');
        const noTaskMessage = document.getElementById('no-tasks-message');
        const filterButton = document.getElementById('btn-filter');
        const deleteAllButton = document.getElementById('btn-delete');

        let filterActive = false; // false = show all, true = show completed only

        function toggleEmptyState() {
            const visibleTasks = Array.from(listTask.querySelectorAll('li')).filter(
                (task) => task.style.display !== 'none'
            );
            noTaskMessage.style.display = visibleTasks.length === 0 ? 'block' : 'none';
        }

        function addtask(event) {
            event.preventDefault();
            const taskText = taskInput.value.trim();
            const dueDate = dueDateInput.value;
            if (!taskText) {
                alert('Please enter a task.');
                return;
            }
            if (!dueDate) {
                alert('Please select a due date.');
                return;
            }
            // Create task item
            const listItem = document.createElement('li');
            listItem.className = 'task-item';
            listItem.innerHTML = `
                <span class="task-text">${taskText} - Due: ${dueDate}</span>
                <div>
                    <button class="btn-complete" title="Toggle Complete">&#10003;</button>
                    <button class="btn-delete" title="Delete Task">&times;</button>
                </div>
            `;

            // Append to list
            listTask.appendChild(listItem);
            // Add event listeners
            const completeBtn = listItem.querySelector('.btn-complete');
            const deleteBtn = listItem.querySelector('.btn-delete');
            completeBtn.addEventListener('click', () => {
                listItem.classList.toggle('completed');
                completeBtn.classList.toggle('completed');
                completeBtn.style.backgroundColor = '#ffaf9d';
                applyFilter();
            });
            deleteBtn.addEventListener('click', () => {
                listTask.removeChild(listItem);
                applyFilter();
                toggleEmptyState();
            });

            // Reset inputs
            taskInput.value = '';
            dueDateInput.value = '';
            applyFilter();
            toggleEmptyState();
        }

function applyFilter() {
            const tasks = listTask.querySelectorAll('li');
            tasks.forEach((task) => {
                if (filterActive) {
                    // Show only completed
                    if (task.classList.contains('completed')) {
                        task.style.display = '';
                    } else {
                        task.style.display = 'none';
                    }
                } else {
                    // Show all
                    task.style.display = '';
                }
            });
            toggleEmptyState();
        }

        filterButton.addEventListener('click', () => {
            filterActive = !filterActive;
            filterButton.textContent = filterActive ? 'Filter' : 'Filter';
            applyFilter();
        });
        deleteAllButton.addEventListener('click', () => {
            listTask.innerHTML = '';
            toggleEmptyState();
        });
        // Initial empty state
        toggleEmptyState();