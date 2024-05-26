/signup untuk regis
post{
email:
password:
username:
name:
}
email verifikasi akan dikirim ke email tujuan klik here untuk verifikasi

/login untuk login
post{
"username": "carlitos",
"password": "farid"
}
respon yang diberikan adalah nama, id, dan token

/webinar untuk mendapat semua webinar

/webinar/page untuk pagination tambahkan query (page = ) untuk page dan (category = ) untuk kategory

/webinar/id untuk menadapat webinar sesuai id

/webinar/add untuk menambah webinar (admin dibutuhkan)
post{
"title": "Peningkatan Produktivitas dengan Teknologi AI",
"description": "Webinar ini akan membahas bagaimana teknologi kecerdasan buatan dapat meningkatkan produktivitas di berbagai bidang industri.",
"image": "https://example.com/images/webinar1.jpg",
"categories": ["ff","pubg"],
"startTime": "2024-06-15T09:00:00Z",
"endTime": "2024-06-15T11:00:00Z"
}

/webinar/edit/id untuk edit webinar (admin dibutuhkan)
patch {
"title": "Peningkatan Produktivitas dengan Teknologi AI",
}

/webinar/delete/id untuk delete webinar sesuai id (admin dibutuhkan)

/id(webinar)/comments untuk user comment
{
"comment":"bagus sekalaiini webuansd"
}

/id(webinar)/ratings untuk user menambah rating webinar
{
"rating": 3
}
