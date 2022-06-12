var selectedRow = null;

function $(id) {
    return document.getElementById(id);
}

function onFormSubmit() {
    if(validate()) {
        var formData = readFormData();
        if(selectedRow == null) {
            insertNewRecord(formData);
        } else {
            updateRecord(formData);
        }
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["fullName"] = $("fullName").value;
    formData["empCode"] = $("empCode").value;
    formData["salary"] = $("salary").value;
    formData["city"] = $("city").value;
    return formData;
}

function insertNewRecord(data) {
    var table = $("employeeList").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);
    cell0 = newRow.insertCell(0);
    cell0.innerHTML = data.fullName;
    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.empCode;
    cell2 = newRow.insertCell(2);
    cell2.innerHTML = data.salary;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Editar</a>
                       <a onClick="onDelete(this)">Deletar</a>`;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.empCode;
    selectedRow.cells[2].innerHTML = formData.salary;
    selectedRow.cells[3].innerHTML = formData.city;
}

function resetForm() {
    $("fullName").value = "";
    $("empCode").value = "";
    $("salary").value = "";
    $("city").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    $("fullName").value = selectedRow.cells[0].innerHTML;
    $("empCode").value = selectedRow.cells[1].innerHTML;
    $("salary").value = selectedRow.cells[2].innerHTML;
    $("city").value = selectedRow.cells[3].innerHTML;
}

function onDelete(td) {
    if(confirm('Tem certeza que deseja excluir este registro?')) {
        row = td.parentElement.parentElement;
        $("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    isValid = true;
    if($("fullName").value == "") {
        isValid = false;
        $("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if(!$("fullNameValidationError").classList.contains("hide")) {
            $("fullNameValidationError").classList.add("hide");
        }
    }
    return isValid;
}