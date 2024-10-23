import { WarningIcon } from "./icons/WarningIcons"

interface ModalDeleteProps {
  funAction: () => void
  onCancel: () => void
}

export const ModalDelete = ({ onCancel, funAction }: ModalDeleteProps) => {
  return (
    <section className="absolute z-20 top-20 left-96 right-96">
      <div className="p-4 md:p-5 text-center bg-gray-200 rounded-md">
        <article>
          <p className="flex justify-center text-red-500">
            <WarningIcon size="size-24" />
          </p>

          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Está seguro que desea eliminar !!!</h3>

          <button type="button" onClick={() => funAction()}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
            Si, Estoy Seguro
          </button>

          <button type="button" onClick={() => onCancel()}
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            No, Cancelar
          </button>
        </article>
      </div>
    </section>
  )
}