var formData = [
    {
        name: "name",
        type: 'text'
    },
    {
        name: "email",
        type: 'email'
    },
    {
        name: "mobileno",
        type: 'number'
    },
    {
        name: "workexperience",
        type: 'text'
    },
    {
        name: "organization",
        type: 'select'
    },
    {
        name: "authorizeCheckBox",
        type: 'checkbox',
    }
];

var ValidateForm = (function() {
    var textRegex, emailRegex, numberRegex;
    var localStorageData;

    function _setSelector() {
        textRegex = /[a-z A-Z 0-9]/g;
        emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
        numberRegex =  /^\d{10}$/g;
        localStorageData= {}
    }

    function handleDataStorage(data, name, value) {
        localStorageData[name] = value;

        if(Object.keys(localStorageData).length >= data.length) {
            localStorage.setItem('formData', JSON.stringify(localStorageData));
        }
    }

    function setFormData(formData) {
        var localData = JSON.parse(localStorage.getItem('formData'));
        if(localData) {
            for(var i= 0; i< formData.length; i++ ) {
                var formInput = document.getElementById(formData[i].name);
                switch(formData[i].type) {    
                    case "checkbox":
                        formInput.checked = localData[formData[i].name];
                        break;
                    
                    default:
                        formInput.value = localData[formData[i].name];
                } 
            }
        }
    }

    function validateInputs (formData) {
        for(var i = 0; i< formData.length; i++) {
            var formInput = document.getElementById(formData[i].name);
            var inputValue = formData[i].type === 'checkbox' ? formInput.checked : formInput.value;
            var isValid = true; 
            
            switch(formData[i].type) {
                case 'text': 
                    isValid =  textRegex.test(inputValue);
                    break;
                
                case 'number':
                    isValid =  numberRegex.test(inputValue);
                    break;

                case 'email': 
                    isValid =  emailRegex.test(inputValue);
                    break;

                case 'select':
                    isValid = inputValue != -1;
                    break;

                case "checkbox":
                    isValid = inputValue;
                    break;
                
                default:
                    isValid = true
            } 

            if(!isValid) {
                formInput.classList.add('invalid');
                localStorageData = {}
            }
            else {
                formInput.classList.remove('invalid');
                handleDataStorage(formData, formData[i].name, inputValue)
            }
        }
    }

    function registerEvents(data) {
        _setSelector();
        validateInputs(data);
    }

    return {
        registerEvents: registerEvents,
        setFormData: setFormData,
    }

})();