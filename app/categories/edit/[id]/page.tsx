import prisma from "@/lib/prisma";
import AddOrUpdateCategorie from "../../addOrUpdateCategorie";

export default async function Update ({ params }: { params: Promise< {id: string}>}) {
    const {id} = await params;
    const categorie = await prisma.categorie.findUnique({
        where: {id: parseInt(id)}
    });
    return (
        <AddOrUpdateCategorie data={categorie} />
    );
}