// Auto Titles a model based on an uploaded file 

// silently ignore if we don't have an uploaded file
if (!it) return

// silently ignore, if we have no form
if (!this.options || !this.options._form) return
var model = this.options._form.model

// silently ignore, if title already set
if (!model || model.get("title")) return

// set the model title to the file's label (aka filename)
model.set("title", it.label || it.name || "Unamed" )

console.log("auto_title: %o %o", model, it)

this.options._form.render()