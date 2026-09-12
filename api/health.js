export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    service: '9 Armoured Cop Security Service Backend',
  });
}
