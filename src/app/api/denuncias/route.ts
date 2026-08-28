import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subject, name, contactInfo, message, isAnonymous, requestType } = body;

    if (!subject || !message) {
      return NextResponse.json(
        { error: 'El asunto y el mensaje son requeridos.' },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();

    const isEmail = contactInfo && contactInfo.includes('@');

    const createdDenuncia = await payload.create({
      collection: 'denuncias',
      data: {
        subject: `[${(requestType || 'denuncia').toUpperCase()}] ${subject}`,
        fullName: isAnonymous ? 'Fuente Anónima' : (name || 'Anónimo'),
        isAnonymous: Boolean(isAnonymous),
        email: isEmail ? contactInfo : undefined,
        phone: !isEmail ? contactInfo : undefined,
        description: message,
        category: requestType === 'denuncia' ? 'servicios_publicos' : 'otro',
        status: 'new',
      },
    });

    return NextResponse.json({
      success: true,
      id: createdDenuncia.id,
      message: 'Denuncia registrada correctamente.',
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Error interno del servidor.';
    console.error('Error al guardar denuncia:', error);
    return NextResponse.json(
      { error: errMessage },
      { status: 500 }
    );
  }
}
