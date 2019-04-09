$(document).ready(function() {
    console.log("test")
    // $('#editor').hide()

    //$(".btn-primary").click(openEditor)
    // $(".btn-outline-success").click(openEditor)

    //// closeEditor()
})

function closeEditor() {
    $('#editor').hide()
    $('#home').show()
}

function openEditor() {
    $('#editor').show()
    $('#home').hide()
}