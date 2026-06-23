import spanishMessages from "ra-language-spanish";

const customSpanishMessages = {
  ...spanishMessages,
  ra: {
    ...spanishMessages.ra,
    action: {
      ...spanishMessages.ra.action,
      export: "Exportar",
      clone: "Clonar",
      confirm: "Confirmar",
      create_item: "Crear %{item}",
      clear_array_input: "Limpiar la lista",
      clear_input_value: "Limpiar valor",
      remove_all_filters: "Quitar todos los filtros",
      reset: "Restablecer",
      search: "Buscar",
      search_columns: "Buscar columnas",
      select_all: "Seleccionar todo",
      select_all_button: "Seleccionar todo",
      select_row: "Seleccionar esta fila",
      unselect: "Deseleccionar",
      expand: "Expandir",
      close: "Cerrar",
      open_menu: "Abrir menú",
      close_menu: "Cerrar menú",
      update: "Actualizar",
      move_up: "Mover arriba",
      move_down: "Mover abajo",
      open: "Abrir",
      toggle_theme: "Cambiar modo claro/oscuro",
      select_columns: "Columnas",
      update_application: "Recargar aplicación",
    },
    boolean: {
      ...spanishMessages.ra.boolean,
      null: " ",
    },
    page: {
      ...spanishMessages.ra.page,
      list: "%{name}",
      edit: "%{name} %{recordRepresentation}",
      show: "%{name} %{recordRepresentation}",
      error: "Algo salió mal",
      empty: "Sin %{name} aún.",
      invite: "¿Desea agregar uno?",
      access_denied: "Acceso denegado",
      authentication_error: "Error de autenticación",
    },
    input: {
      ...spanishMessages.ra.input,
      file: {
        upload_several:
          "Arrastra algunos archivos para empezar la subida, o presiona aquí para seleccionarlos.",
        upload_single:
          "Arrastra un archivo para empezar la subida, o presiona aquí para seleccionarlo.",
      },
      image: {
        upload_several:
          "Arrastra algunas imágenes para empezar la subida, o presiona aquí para seleccionarlas.",
        upload_single:
          "Arrastra una imagen aquí para empezar la subida, o presiona aquí para seleccionarla.",
      },
      password: {
        toggle_visible: "Ocultar contraseña",
        toggle_hidden: "Mostrar contraseña",
      },
    },
    message: {
      ...spanishMessages.ra.message,
      access_denied: "No tienes los permisos necesarios para acceder a esta página",
      authentication_error:
        "El servidor de autenticación devolvió un error y no se pudieron verificar tus credenciales.",
      auth_error:
        "Ocurrió un error al validar el token de autenticación.",
      bulk_delete_content:
        "¿Estás seguro de que quieres borrar este %{name}? |||| ¿Estás seguro de que quieres borrar estos %{smart_count} elementos?",
      bulk_delete_title:
        "Borrar %{name} |||| Borrar %{smart_count} %{name}",
      bulk_update_content:
        "¿Estás seguro de que quieres actualizar %{name} %{recordRepresentation}? |||| ¿Estás seguro de que quieres actualizar estos %{smart_count} elementos?",
      bulk_update_title:
        "Actualizar %{name} %{recordRepresentation} |||| Actualizar %{smart_count} %{name}",
      clear_array_input: "¿Estás seguro de que quieres limpiar toda la lista?",
      delete_content: "¿Estás seguro de que quieres borrar este %{name}?",
      delete_title: "Borrar %{name} %{recordRepresentation}",
      details: "Detalles",
      error: "Ocurrió un error en el cliente y tu solicitud no se pudo completar.",
      loading: "Por favor espera",
      no: "No",
      not_found: "URL incorrecta o el enlace no existe.",
      select_all_limit_reached:
        "Hay demasiados elementos para seleccionarlos todos. Solo se seleccionaron los primeros %{max} elementos.",
      unsaved_changes:
        "Algunos cambios no se guardaron. ¿Estás seguro de que quieres ignorarlos?",
      yes: "Sí",
      placeholder_data_warning: "Problema de red: actualización de datos fallida.",
    },
    navigation: {
      ...spanishMessages.ra.navigation,
      clear_filters: "Limpiar filtros",
      no_filtered_results: "No se encontraron %{name} con los filtros actuales.",
      no_results: "No se encontraron %{name}",
      partial_page_range_info:
        "%{offsetBegin}-%{offsetEnd} de más de %{offsetEnd}",
      current_page: "Página %{page}",
      page: "Ir a la página %{page}",
      first: "Ir a la primera página",
      last: "Ir a la última página",
      previous: "Ir a la página anterior",
      page_rows_per_page: "Filas por página:",
      skip_nav: "Ir al contenido",
    },
    sort: {
      sort_by: "Ordenar por %{field_lower_first} %{order}",
      ASC: "ascendente",
      DESC: "descendente",
    },
    auth: {
      ...spanishMessages.ra.auth,
      auth_check_error: "Inicia sesión para continuar",
      user_menu: "Perfil",
      email: "Correo electrónico",
    },
    notification: {
      ...spanishMessages.ra.notification,
      data_provider_error:
        "Error del proveedor de datos. Revisa la consola para más detalles.",
      i18n_error: "No se pueden cargar las traducciones para el idioma especificado",
      logged_out: "Tu sesión ha terminado, por favor vuelve a conectarte.",
      not_authorized: "No tienes autorización para acceder a este recurso.",
      application_update_available: "Hay una nueva versión disponible.",
      offline: "Sin conexión. No se pudieron obtener los datos.",
    },
    saved_queries: {
      label: "Consultas guardadas",
      query_name: "Nombre de la consulta",
      new_label: "Guardar consulta actual...",
      new_dialog_title: "Guardar consulta actual como",
      remove_label: "Eliminar consulta guardada",
      remove_label_with_name: 'Eliminar consulta "%{name}"',
      remove_dialog_title: "¿Eliminar consulta guardada?",
      remove_message:
        "¿Estás seguro de que quieres eliminar este elemento de tu lista de consultas guardadas?",
      help: "Filtra la lista y guarda esta consulta para más tarde",
    },
  },

  // Custom app notification messages — used directly as translation keys via notify()
  "Contrato actualizado": "Contrato actualizado",
  "Contrato agregado": "Contrato agregado",
  "Contrato eliminado": "Contrato eliminado",
  "Error al actualizar subcuenta": "Error al actualizar subcuenta",
  "Error al asignar loncheras": "Error al asignar loncheras",
  "Error al crear subcuenta": "Error al crear subcuenta",
  "Error al eliminar subcuenta": "Error al eliminar subcuenta",
  "Error al generar el plan de pago": "Error al generar el plan de pago",
  "Error al registrar el pago": "Error al registrar el pago",
  "Esta persona no tiene deudas pendientes de lonchera":
    "Esta persona no tiene deudas pendientes de lonchera",
  "Estudiante creado exitosamente": "Estudiante creado exitosamente",
  "Estudiante matriculado exitosamente": "Estudiante matriculado exitosamente",
  "Estudiante retirado": "Estudiante retirado",
  "Loncheras asignadas correctamente": "Loncheras asignadas correctamente",
  "Matrícula actualizada": "Matrícula actualizada",
  "Matrícula cancelada": "Matrícula cancelada",
  "Matrícula reactivada": "Matrícula reactivada",
  "Pago registrado correctamente": "Pago registrado correctamente",
  "Subcuenta actualizada": "Subcuenta actualizada",
  "Subcuenta creada": "Subcuenta creada",
  "Subcuenta eliminada": "Subcuenta eliminada",
};

export default customSpanishMessages;
