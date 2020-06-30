import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Materia } from '../../models/materia';
import { MateriasService } from '../../services/materias.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
accionABMC: string;
  materias: Materia[];
  formMod: FormGroup;

  constructor( private materiasService: MateriasService,
              private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.accionABMC = "L"
    this.getMaterias();

    this.formMod = this.formbuilder.group({
      txtID: [''],
      txtNombre: ['',[Validators.required, Validators.maxLength(50)]],
      txtAnio: ['', [
          Validators.required,
          Validators.pattern("[0-9]{1,4}")
        ]],      
    })
  }

  getMaterias(){
    this.materiasService.getAll().subscribe((res: Materia[]) => {
      this.materias = res;
    } )
  }

  alta(){
    this.accionABMC = "A";
    }


  insertar(){

    if(this.formMod.invalid) {
      window.alert("Form inválido. Revise los datos")
      return;
    }
    let materia : Materia = new Materia();

    materia.MateriaNombre = this.formMod.controls.txtNombre.value;
    materia.MateriaAnio = this.formMod.controls.txtAnio.value;

    this.materiasService.post(materia).subscribe(res => {
      this.accionABMC = "L";
      this.limpiarForm();
      this.getMaterias();
    })
  }

  cancelar(){
    this.accionABMC = "L";
    this.limpiarForm();
    this.getMaterias();
  }

  limpiarForm(){
    this.formMod.controls.txtID.setValue("");
    this.formMod.controls.txtNombre.setValue("");
    this.formMod.controls.txtAnio.setValue("");
    this.formMod.markAsUntouched();
    this.formMod.markAsPristine();
  }
}