import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class CreateTasksComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      dueDate: ['', Validators.required],
      assignedPersons: this.fb.array([])
    });
  }

  get assignedPersons(): FormArray {
    return this.taskForm.get('assignedPersons') as FormArray;
  }

  getSkills(personIndex: number): FormArray {
    return this.assignedPersons.at(personIndex).get('skills') as FormArray;
  }

  addPerson() {
    const personFormGroup = this.fb.group({
      userId: [this.assignedPersons.length + 1], // Asignar un ID único
      fullName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      skills: this.fb.array([])
    });
    this.assignedPersons.push(personFormGroup);
  }

  removePerson(index: number) {
    this.assignedPersons.removeAt(index);
  }

  addSkill(personIndex: number) {
    const skillFormGroup = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      yearsExperience: ['', [Validators.required, Validators.min(0)]]
    });
    this.getSkills(personIndex).push(skillFormGroup);
  }

  removeSkill(personIndex: number, skillIndex: number) {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      console.log('New Task Created:', newTask);

      // Guardar en local storage
      let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));

      this.taskForm.reset();
    }
  }
}
