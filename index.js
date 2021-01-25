const Jimp = require('jimp')

const cert = 'template-cert.jpg'

Jimp.read(cert, (err, cert) => {
  if (err) throw err

  cert.quality(60)

  let w = cert.bitmap.width
  let h = cert.bitmap.height

  let student = 'MISS HO'
  let instructor = 'Jason Your Favourite Guy'
  let date = new Date().toLocaleDateString()
  let certId = 'CRAVEDU-ABC123'

  Jimp.loadFont(Jimp.FONT_SANS_128_BLACK).then((font) => {
    let textW = Jimp.measureText(font, student)
    let textH = Jimp.measureTextHeight(font, student)
    cert.print(
      font,
      w / 2 - textW / 2,
      h / 2 - textH / 2 - 120,
      {
        text: student,
      },
      textW,
      textH
    )
    Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
      .then((font) => {
        let textW = Jimp.measureText(font, instructor)
        let textH = Jimp.measureTextHeight(font, instructor)
        cert.print(
          font,
          w / 2 - textW / 2 - 685,
          h / 2 - textH / 2 + 400,
          {
            text: instructor,
          },
          textW,
          textH
        )
        let dtextW = Jimp.measureText(font, date)
        let dtextH = Jimp.measureTextHeight(font, date)
        cert.print(
          font,
          w / 2 - dtextW / 2 + 685,
          h / 2 - dtextH / 2 + 400,
          {
            text: date,
          },
          dtextW,
          dtextH
        )
        let idtextW = Jimp.measureText(font, certId)
        let idtextH = Jimp.measureTextHeight(font, certId)
        cert.print(
          font,
          w / 2 - idtextW / 2,
          h / 2 - idtextH / 2 + 1080,
          {
            text: `#${certId}`,
          },
          idtextW,
          idtextH
        )
        return cert
      })
      .then((cert) => {
        let file = `cert-${certId}.${cert.getExtension()}`
        return cert.write(file)
      })
  })
})
