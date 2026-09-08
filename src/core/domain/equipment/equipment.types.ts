import { EquipmentItemDefinition } from '../../../types';
import { InventoryItemInstance, EquipmentSlots } from '../character/character.types';

export interface EquipmentCatalogItem extends EquipmentItemDefinition {}

export interface InventoryManagementResult {
  inventario: InventoryItemInstance[];
  equipamiento: EquipmentSlots;
  pesoTotalKg: number;
}
