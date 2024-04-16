const { useFormikContext } = require("formik");

function LabelErrorContainer({ label, name }) {
    const { errors, touched } = useFormikContext();

    return(
        `<div class="w-full flex justify-start items-center gap-3">
            <label for="${name}" class="text-sm text-lightFont">
                ${label}
            </label>

            ${errors && errors[name] && touched && touched[name] && `<p class="text-red-500 text-xs">${errors[name]}</p>`}
        </div>`
    );
}

module.exports = LabelErrorContainer;
