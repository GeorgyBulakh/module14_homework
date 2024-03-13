const xmlString = `
  <list>
    <student>
      <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    <student>
      <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
    </student>
  </list>
`

const parser = new DOMParser()
const xmlDOM = parser.parseFromString(xmlString, "text/xml")

const students = Array.from(xmlDOM.getElementsByTagName("student")).map(student => {
  const nameNode = student.querySelector("name")
  const firstName = nameNode.querySelector("first").textContent
  const lastName = nameNode.querySelector("second").textContent
  const age = student.querySelector("age").textContent
  const prof = student.querySelector("prof").textContent
  const lang = nameNode.getAttribute("lang")

  return {name: `${firstName} ${lastName}`, age, prof, lang}
})

const result = {list: students}

console.log(result)

