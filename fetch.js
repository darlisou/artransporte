fetch('https://ibb.co/ds66699C').then(r=>r.text()).then(t=>console.log(t.match(/https:\/\/i\.ibb\.co\/[^\"\'\s]+/g)))
