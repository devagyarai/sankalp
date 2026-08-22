"""Add auth fields to User

Revision ID: 43006cea7f04
Revises: ee5746a1de88
Create Date: 2026-08-22 17:56:39.492046

"""
from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = '43006cea7f04'
down_revision: str | Sequence[str] | None = 'ee5746a1de88'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('users', sa.Column('role', sa.String(length=50), server_default='USER', nullable=False))
    op.add_column('users', sa.Column('is_active', sa.Boolean(), server_default='true', nullable=False))
    op.add_column('users', sa.Column('last_login_at', sa.DateTime(timezone=True), nullable=True))
    op.drop_column('users', 'status')


def downgrade() -> None:
    """Downgrade schema."""
    op.add_column('users', sa.Column('status', sa.String(length=50), server_default='active', autoincrement=False, nullable=False))
    op.drop_column('users', 'last_login_at')
    op.drop_column('users', 'is_active')
    op.drop_column('users', 'role')
