

export default async function handler(req, res) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });
  const data = await response.json();
  res.status(200).json(data);
}


