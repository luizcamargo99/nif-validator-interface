//PURE JAVASCRIPT VERSION

const api_endpoint = 'https://nifvalidator-api.azurewebsites.net/Validate?nif=[NIF_FIELD]';

async function validate() {
    document.getElementById('validate-result').style.display = 'none';
    let nif_value = document.getElementById('nif-value').value;
    let is_valid = validateFieldMandatory(nif_value);
    
    if (is_valid){
        const endpoint_with_parameter = api_endpoint.replace('[NIF_FIELD]', nif_value);
        const response = await fetch(endpoint_with_parameter);
        handleResponse(response);
    }
}

function validateFieldMandatory(nif_value) {
    return nif_value == '' ? false : true;
}

async function handleResponse (response_request) {
    let errorRequest = document.getElementById('request-error');
    if (response_request.status == 200) {
        errorRequest.style.display = 'none';
        showResultValidation(await response_request.json());
    }
    else if (response_request.status == 400) {
        errorRequest.style.display = 'flex';
    }
}

function showResultValidation(object_api) {

    var object_handle = {
        validity: document.getElementById('validity'),
        nif_type: document.getElementById('nif-type'),
        error_message: document.getElementById('error-message'),
        object_api: object_api
    };

    object_api.isValid ? handleValidNif(object_handle) : handleInvalidNif(object_handle);

    document.getElementById('validate-result').style.display = 'flex';
}

function handleValidNif(object_handle) {
    object_handle.validity.innerHTML = 'VALID NIF!';
    object_handle.validity.style.background = '#219642'; 
    const type_result = document.getElementById('type-result');
    type_result.innerHTML = object_handle.object_api.type;
    object_handle.nif_type.style.display = 'flex';
    object_handle.error_message.style.display = 'none';
}

function handleInvalidNif(object_handle) {
    object_handle.validity.innerHTML = 'INVALID NIF!';
    object_handle.validity.style.background = '#D1221D';
    object_handle.nif_type.style.display = 'none';
    object_handle.error_message.innerHTML = object_handle.object_api.errorMessage;
    object_handle.error_message.style.display = 'flex';
}